import { useLoaderData } from 'react-router-dom';
import ProcessElection from '../components/processElection/ProcessElection';

const Process = () => {
  let id = useLoaderData();

  return <ProcessElection id={id} />;
};

export const getProcessInfo = ({ params }: any) => {
  const { id } = params;

  return id;
};

export default Process;
