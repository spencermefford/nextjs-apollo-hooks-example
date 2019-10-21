import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Task from './Task';

const TASKS_QUERY = gql`
  query Tasks {
    tasks {
      id
      title
    }
  }
`;

const TasksContainer = () => {
  const {loading, data} = useQuery(TASKS_QUERY);

  if (loading) return <div>Loading...</div>

  return data.tasks.map((task) => <Task task={task}></Task>);
};

export default TasksContainer;