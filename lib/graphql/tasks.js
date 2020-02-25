import { gql } from '@apollo/client';

export const TASKS_QUERY = gql`
  query Tasks {
    tasks {
      id
      title
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
