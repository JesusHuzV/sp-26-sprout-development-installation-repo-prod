import { gql } from "@solid-primitives/graphql";

const ProductsQuery = gql`
  query Products {
    products(first: 250) {
      nodes {
        id
        title
      }
    }
  }
`


export default ProductsQuery;
