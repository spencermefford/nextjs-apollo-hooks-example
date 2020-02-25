import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const TaskWrapper = styled.div`
  margin-bottom: 5px;
`;

const StyledCheckbox = styled.input`
  margin-right: 8px;
`;

const DeleteButton = styled.button`
  cursor: pointer;
`;

const Task = ({ task, onCompleted, onDelete }) => {
  const { id, title } = task;

  return (
    <TaskWrapper>
      <StyledCheckbox
        type="checkbox"
        checked={task.completed}
        onChange={event => {
          onCompleted(id, event.target.checked);
        }}
      />
      <Link href="/task/[id]" as={`/task/${id}`}>
        <a>{title}</a>
      </Link>{' '}
      <DeleteButton
        title="Delete"
        onClick={() => {
          onDelete(id);
        }}
      >
        delete
      </DeleteButton>
    </TaskWrapper>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default Task;
