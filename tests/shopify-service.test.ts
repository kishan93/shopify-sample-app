import { it } from "node:test";
import { ShopifyService } from "../dist/services/shopify";
import Product from "../dist/services/shopify/product";

test('ShopifyService should create a new ShopifyService instance', () => {
    const shopifyService = new ShopifyService({
        domain: 'test.myshopify.com',
        apiKey: 'test-api-key',
        apiSecret: 'test-api-secret',
        adminToken: 'test-admin-token',
        storefrontToken: 'test-store-front-token',
        hostName: 'test-host-name',
    })

    expect(shopifyService).toBeInstanceOf(ShopifyService)
})

test('ShopifyService product endpoint should be defined', () => {

    const shopifyService = new ShopifyService({
        domain: 'test.myshopify.com',
        apiKey: 'test-api-key',
        apiSecret: 'test-api-secret',
        adminToken: 'test-admin-token',
        storefrontToken: 'test-store-front-token',
        hostName: 'test-host-name',
    })

    expect(shopifyService.product()).toBeDefined()
    expect(shopifyService.product()).toBeInstanceOf(Product)
})
