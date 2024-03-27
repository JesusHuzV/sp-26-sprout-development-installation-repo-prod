import createQuery from '@/graphql/client';
import type {
  ProductsQuery,
  ProductsQueryVariables,
} from '@/graphql/generated/types';
import productsQuery from '@/graphql/queryProducts';
import { Show, render } from 'solid-js/web';

const Index = () => {
  const [products] = createQuery<ProductsQuery, ProductsQueryVariables>(
    productsQuery,
  );
  return (
    <Show keyed when={products()}>
      {(data) => {
        console.log(data);
        return <h1>First component</h1>;
      }}
    </Show>
  );
};
export default Index;

render(Index, document.getElementById('index')!);
