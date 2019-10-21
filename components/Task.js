import React from 'react';
import PropTypes from 'prop-types';

const Task = (props) => {
  const { task } = props;
  return <div>{task.title}</div>;
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default Task;