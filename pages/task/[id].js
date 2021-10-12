import { useRouter } from 'next/router';
import App from '../../components/App';
import TaskDetailsContainer from '../../components/TaskDetailsContainer';

const TaskDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <App>
      <TaskDetailsContainer taskId={id} />
    </App>
  );
};

export default TaskDetailsPage;
