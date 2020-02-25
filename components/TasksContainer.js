import { gql, useQuery, useMutation } from '@apollo/client';
import Task from './Task';

const TASKS_QUERY = gql`
  query Tasks {
    tasks {
      id
      title
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($title: String!) {
    createTask(title: $title) {
      id
      title
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      success
    }
  }
`;

const TasksContainer = () => {
  const { loading, data } = useQuery(TASKS_QUERY);
  const [addTask] = useMutation(CREATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  if (loading) return <div>Loading...</div>;

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      const title = e.target.value;
      e.target.value = '';
      addTask({
        variables: { title },
        update: (cache, { data: { createTask } }) => {
          const { tasks } = cache.readQuery({ query: TASKS_QUERY });
          cache.writeQuery({
            query: TASKS_QUERY,
            data: { tasks: tasks.concat([createTask]) },
          });
        },
      });
    }
  };

  const handleDelete = id => {
    if (confirm('Are you sure you want to delete that task?')) {
      deleteTask({
        variables: { id },
        update: cache => {
          const { tasks = [] } = cache.readQuery({ query: TASKS_QUERY });
          cache.writeQuery({
            query: TASKS_QUERY,
            data: { tasks: tasks.filter(task => task.id !== id) },
          });
        },
      });
    }
  };

  return (
    <div>
      <style jsx>{`
        ul {
          margin-top: 15px;
          padding: 0 20px;
        }
      `}</style>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Add a task..."
      />
      <ul>
        {data.tasks.map(task => (
          <li key={task.id}>
            <Task task={task} onDelete={handleDelete}></Task>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksContainer;
