import { ElectionProvider } from '@vocdoni/react-components';
import { Signer } from 'ethers';
import { useSigner } from 'wagmi';
import CreateProcess from '../components/CreateProcess';

const Create = () => {
  const { data: signer } = useSigner();

  return (
    <ElectionProvider signer={signer as Signer}>
      <CreateProcess />
    </ElectionProvider>
  );
};

export default Create;
