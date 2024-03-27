import { createGraphQLClient } from "@solid-primitives/graphql";

export const url = `https://${window.Shopify.shop}/api/2023-01/graphql.json`;

const createQuery = createGraphQLClient(url, {
  headers: {
    "X-Shopify-Storefront-Access-Token": window.storefrontApi.accessToken,
  },
});

export default createQuery;
