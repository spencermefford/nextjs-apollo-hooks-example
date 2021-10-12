import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Task = ({ task, onCompleted, onDelete }) => {
  const { id, title, completed = false } = task;

  return (
    <div class="task-wrapper">
      <style jsx>{`
        .task-wrapper {
          margin-bottom: 5px;
        }
        .task-checkbox {
          margin-right: 8px;
        }
        button {
          cursor: pointer;
        }
      `}</style>
      <input
        type="checkbox"
        class="task-checkbox"
        checked={!!completed}
        onChange={event => {
          onCompleted(id, event.target.checked);
        }}
      />
      <Link href="/task/[id]" as={`/task/${id}`}>
        <a>{title}</a>
      </Link>{' '}
      <button
        title="Delete"
        onClick={() => {
          onDelete(id);
        }}
      >
        delete
      </button>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default Task;
