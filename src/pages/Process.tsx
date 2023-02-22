import { Text } from '@chakra-ui/react';
import { useLoaderData } from 'react-router-dom';

const Process = () => {
  let id = useLoaderData();

  //   const { data: signer } = useSigner();

  //   const client = getClient(signer);

  //   const getInfo = async () => {
  //     const info = await client.fetchElection(id);
  //   };

  //   useEffect(() => {
  //     getInfo();
  //   }, []);

  console.log(typeof id);
  return <Text>Process</Text>;
};

export const getProcessInfo = ({ params }: any) => {
  const { id } = params;

  return id;
};

export default Process;
