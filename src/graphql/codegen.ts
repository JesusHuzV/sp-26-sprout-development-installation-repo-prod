
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // generate glob that matches any file that starts with 'query' or 'mutation' and ends with '.ts'
  documents: './src/graphql/{query,mutation}*.ts',
  schema: [
    {
      'https://graphql.myshopify.com/api/2023-01/graphql.json': {
        headers: {
          'x-shopify-storefront-access-token':
            'ecdc7f91ed0970e733268535c828fbbe',
        },
      },
    },
  ],

  generates: {
    './src/graphql/generated/types.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
};

export default config;
