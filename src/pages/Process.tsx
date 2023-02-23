import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import ProcessElection from '../components/processElection/ProcessElection';

const Process = () => {
  let id = useLoaderData();

  return <ProcessElection id={id} />;
};

export const getProcessInfo = ({
  params: { id },
}: LoaderFunctionArgs): string => id!;

export default Process;
