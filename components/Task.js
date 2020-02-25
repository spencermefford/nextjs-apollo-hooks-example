import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ task, onDelete }) => {
  return (
    <div>
      {task.title}{' '}
      <a
        href="#"
        title="Delete"
        onClick={() => {
          onDelete(task.id);
        }}
      >
        [delete]
      </a>
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
