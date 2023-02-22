import { Text } from '@chakra-ui/react';
import {
  ElectionDescription,
  ElectionProvider,
  ElectionTitle,
} from '@vocdoni/react-components';

interface props {
  id: any;
}

const ProcessElection = ({ id }: props) => {
  return (
    <>
      <ElectionProvider id={id}>
        <Text mb={12}>Process: {id}</Text>
        <ElectionTitle />
        <ElectionDescription />
      </ElectionProvider>
    </>
  );
};

export default ProcessElection;
