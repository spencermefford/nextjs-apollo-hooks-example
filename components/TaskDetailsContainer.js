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
      completed
    }
  }
`;

const RENAME_TASK = gql`
  mutation RenameTask($id: ID!, $title: String!) {
    renameTask(id: $id, title: $title) {
      id
      title
    }
  }
`;

const TaskDetailsContainer = ({ taskId }) => {
  const { loading, data = {} } = useQuery(TASK_QUERY, {
    variables: { id: taskId },
  });
  const [renameTask] = useMutation(RENAME_TASK);
  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted: () => {
      Router.replace('/');
    },
  });

  if (loading) return <div>Loading...</div>;

  if (!data.task) return <Error statusCode={404} />;

  const { task = {} } = data;
  const { id, title } = task;

  const handleRename = () => {
    const newTitle = prompt('Please enter a new name for your task', title);
    renameTask({
      variables: { id, title: newTitle },
      optimisticResponse: {
        __typename: 'Mutation',
        renameTask: {
          id,
          __typename: 'Task',
          title: newTitle,
        },
      },
    });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete that task?')) {
      deleteTask({
        variables: { id },
        update: cache => {
          const { tasks = [] } = cache.readQuery({ query: TASKS_QUERY });
          cache.writeQuery({
            query: TASKS_QUERY,
            data: { tasks: tasks.filter(t => t.id !== id) },
          });
        },
      });
    }
  };

  return (
    <div>
      <div>
        <Link href="/">
          <a>[back]</a>
        </Link>
      </div>
      <h2>{title}</h2>
      <div>
        <button onClick={handleRename}>rename</button>{' '}
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
};

export default TaskDetailsContainer;
