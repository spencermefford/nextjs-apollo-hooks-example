import { gql, useQuery, useMutation } from '@apollo/client';
import Task from './Task';
import { TASKS_QUERY, DELETE_TASK } from '../lib/graphql/tasks';
import styled from 'styled-components';

const CREATE_TASK = gql`
  mutation CreateTask($title: String!) {
    createTask(title: $title) {
      id
      title
    }
  }
`;

const COMPLETE_TASK = gql`
  mutation CompleteTask($id: ID!, $completed: Boolean!) {
    completeTask(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

const TaskListWrapper = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 25px 0;
`;

const TasksContainer = () => {
  const { loading, data } = useQuery(TASKS_QUERY);
  const [addTask] = useMutation(CREATE_TASK);
  const [completeTask] = useMutation(COMPLETE_TASK);
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

  const handleCompleted = (id, completed) => {
    completeTask({
      variables: { id, completed },
      optimisticResponse: {
        __typename: 'Mutation',
        completeTask: {
          id,
          __typename: 'Task',
          completed,
        },
      },
    });
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
      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Add a task..."
        autoFocus={true}
      />
      <TaskListWrapper>
        {data.tasks.map(task => (
          <li key={task.id}>
            <Task
              task={task}
              onCompleted={handleCompleted}
              onDelete={handleDelete}
            />
          </li>
        ))}
      </TaskListWrapper>
    </div>
  );
};

export default TasksContainer;
