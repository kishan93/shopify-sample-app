import '@shopify/shopify-api/adapters/node';

import { GraphqlClient, LATEST_API_VERSION, LogSeverity, Shopify, shopifyApi } from "@shopify/shopify-api"
import { StorefrontClient } from "@shopify/shopify-api/dist/ts/lib/clients/storefront/client"
import Product from "./product"

export class ShopifyService {
    private domain: string
    private apiKey: string
    private apiSecret: string
    private adminToken: string
    private storefrontToken: string

    private graphQlClient: GraphqlClient
    private storefrontClient: StorefrontClient
    shopify: Shopify

    constructor(config:{
        domain: string,
        apiKey: string,
        apiSecret: string,
        adminToken: string,
        storefrontToken: string,
    }) {
        this.domain = config.domain
        this.apiKey = config.apiKey
        this.apiSecret = config.apiSecret
        this.adminToken = config.adminToken
        this.storefrontToken = config.storefrontToken

        this.shopify = shopifyApi({
            apiKey: this.apiKey,
            apiSecretKey: this.apiSecret,
            scopes: ['read_products'],
            hostName: process.env.HOST_NAME,
            apiVersion: LATEST_API_VERSION,
            isEmbeddedApp: false,
            debug: false,
            logger: {
                level: LogSeverity.Error,
            }
        })

        this.initGraphqlClient()
        this.initStorefrontClient()
    }

    initGraphqlClient() {
        const session = this.shopify.session.customAppSession(this.domain)
        session.accessToken = this.adminToken

        this.graphQlClient = new this.shopify.clients.Graphql({
            session: session,
        })
    }

    initStorefrontClient() {
        const session = this.shopify.session.customAppSession(this.domain)
        session.accessToken = this.storefrontToken

        this.storefrontClient = new this.shopify.clients.Storefront({
            session: session,
        })
    }

    getGraphqlClient(): GraphqlClient {
        return this.graphQlClient
    }

    product() {
        return new Product(this)
    }

}
