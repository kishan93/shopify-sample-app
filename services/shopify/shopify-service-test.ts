import { describe, it } from "node:test";
import { ShopifyService } from "../dist/services/shopify";

describe('ShopifyService', () => {
    it('should create a new ShopifyService instance', () => {
        const shopifyService = new ShopifyService({
            domain: 'test.myshopify.com',
            apiKey: 'test-api-key',
            apiSecret: 'test-api-secret',
            adminToken: 'test-admin-token',
            storefrontToken: 'test-store-front-token',
        })

        expect(shopifyService).toBeInstanceOf(ShopifyService)
    })
})
