import Link from 'next/link';
import Router from 'next/router';
import Error from 'next/error';
import { gql, useQuery, useMutation } from '@apollo/client';
import { DELETE_TASK, TASKS_QUERY } from '../lib/graphql/tasks';

const TASK_QUERY = gql`
  query Task($id: ID!) {
    task(id: $id) {
      id
      title
    }
  }
`;

// const CREATE_TASK = gql`
//   mutation CreateTask($title: String!) {
//     createTask(title: $title) {
//       id
//       title
//     }
//   }
// `;

const TaskDetailsContainer = ({ taskId }) => {
  const { loading, data = {} } = useQuery(TASK_QUERY, {
    variables: { id: taskId },
  });
  // const [addTask] = useMutation(CREATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK, {
    variables: { id: taskId },
    onCompleted: () => {
      Router.replace('/');
    },
  });

  if (loading) return <div>Loading...</div>;

  if (!data.task) return <Error statusCode={404} />;

  // const handleKeyDown = e => {
  //   if (e.key === 'Enter') {
  //     const title = e.target.value;
  //     e.target.value = '';
  //     addTask({
  //       variables: { title },
  //       update: (cache, { data: { createTask } }) => {
  //         const { tasks } = cache.readQuery({ query: TASKS_QUERY });
  //         cache.writeQuery({
  //           query: TASKS_QUERY,
  //           data: { tasks: tasks.concat([createTask]) },
  //         });
  //       },
  //     });
  //   }
  // };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete that task?')) {
      deleteTask({
        update: cache => {
          const { tasks = [] } = cache.readQuery({ query: TASKS_QUERY });
          cache.writeQuery({
            query: TASKS_QUERY,
            data: { tasks: tasks.filter(task => task.id !== taskId) },
          });
        },
      });
    }
  };

  const { task = {} } = data;
  const { title } = task;

  return (
    <div>
      <div>
        <Link href="/">
          <a>[back]</a>
        </Link>
      </div>
      <h2>{title}</h2>
      <div>
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
};

export default TaskDetailsContainer;
