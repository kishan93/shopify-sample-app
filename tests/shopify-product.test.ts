import { ShopifyServiceContract } from "../services/shopify"
import Product from "../services/shopify/product"

test('product endpoint should query products by name', () => {
    const shopifyServiceMock: ShopifyServiceContract = {
        getGraphqlClient: jest.fn().mockReturnValue({
            request: jest.fn().mockResolvedValue({
            })
        }),
        getStorefrontClient: jest.fn().mockReturnValue({}),
    }

    const product = new Product(shopifyServiceMock)

    product.getProductsByNames('test-product')

    expect(shopifyServiceMock.getGraphqlClient).toHaveBeenCalled()
    expect(shopifyServiceMock.getGraphqlClient().request).toHaveBeenCalled()

})
