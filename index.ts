import dotenv from 'dotenv'
import { ShopifyService } from './services/shopify'
import { program } from 'commander'

(async () => {
    program.option('-n, --name <name>', 'Product name')
    program.parse()
    const options = program.opts()

    if(!options.name) {
        console.log('Please provide a product name')
        return
    }

    dotenv.config();

    const shopifyService = new ShopifyService({
        domain: process.env.SHOPIFY_URL,
        apiKey: process.env.SHOPIFY_API_KEY,
        apiSecret: process.env.SHOPIFY_API_SECRET,
        adminToken: process.env.SHOPIFY_ADMIN_TOKEN,
        storefrontToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
        hostName: process.env.HOST_NAME,
    });

    const res = await shopifyService.product().getProductsByNames(options.name);

    if(!res.data) {
        return
    }

    const products = res.data.products.edges

    const variants = products.map((product) => {
        const { id, title, variants } = product.node

        return variants.edges.map((variant) => {
            return {
                title,
                variant: variant.node.title,
                price: variant.node.price,
            }
        })
    }).flat().sort((a, b) => a.price - b.price)

    for(const variant of variants) {
        console.log(`${variant.title} - ${variant.variant} - $${variant.price}`)
    }

})();

