import { ShopifyServiceContract } from ".";

export default class Product {
    shopifyService: ShopifyServiceContract;

    constructor(shopifyService: ShopifyServiceContract) {
        this.shopifyService = shopifyService;
    }


    async getProductsByNames(name: string) {
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
