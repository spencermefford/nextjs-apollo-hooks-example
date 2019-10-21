import App from '../components/App'
import { withApollo } from '../lib/apollo'
import TasksContainer from '../components/TasksContainer'

const IndexPage = props => (
  <App>
    <TasksContainer/>
  </App>
)

export default withApollo(IndexPage)
