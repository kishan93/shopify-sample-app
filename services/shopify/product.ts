import { ShopifyService } from ".";

export default class Product {
    shopifyService: ShopifyService;

    constructor(shopifyService: ShopifyService) {
        this.shopifyService = shopifyService;
    }


    async getProductsByNames(name: string) {
        // filter products by name, sort products by variant price
        let query = `
            query {
                products(first: 10, query: "title:${name}") {
                    edges {
                        node {
                            id
                            title
                            variants(first: 1) {
                                edges {
                                    node {
                                       title
                                       price
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `

        return await this.shopifyService.getGraphqlClient()
            .request(query)
    }

}
