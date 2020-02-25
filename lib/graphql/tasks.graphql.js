import { gql } from '@apollo/client';

export const TASKS_QUERY = gql`
  query Tasks {
    tasks {
      id
      title
      completed
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      success
    }
  }
`;

export const COMPLETE_TASK = gql`
  mutation CompleteTask($id: ID!, $completed: Boolean!) {
    completeTask(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;
