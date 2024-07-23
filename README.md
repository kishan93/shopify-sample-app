# Task

Create a script that communicates with Shopify through Shopify’s graphql APIs.
It takes input product names and fetches the appropriate products that match the
name and list down the variants sorting by price.

# Requirements
- Node.js 20

# Usage
- clone repo
- cd into the repo
- copy the .env.example file to .env
```bash
cp .env.example .env
```
- add your shopify domain(without https/http) and access token to the .env file
- install dependencies
```bash
npm install
```
- compile typescript
```bash
npm run build
```
- run the script
```bash
node dist/index.js -n "product name"
```
