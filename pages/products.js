import App from '../components/App'
import ProductsContainer from '../components/ProductsContainer'
import { initializeApollo, addApolloState } from '../lib/apolloClient'

const ProductsPage = () => (
  <App>
    <ProductsContainer/>
  </App>
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default ProductsPage
