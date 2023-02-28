import { InfoIcon } from '@chakra-ui/icons';
import { ButtonGroup, HStack, IconButton } from '@chakra-ui/react';
import { PublishedElection } from '@vocdoni/sdk';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa';
import { useSigner } from 'wagmi';
import { ELECTION_ACTION } from '../../constants/election';
import { getButtonsDisabled } from '../../lib/processList/buttonsDisabled';
import { getClient, updateBalance } from '../../lib/sdk/sdk';

interface Props {
  el: PublishedElection;
  setElectionsList: React.Dispatch<React.SetStateAction<PublishedElection[]>>;
  onOpen: () => void;
}

const ProcessListActionButtons = ({ el, setElectionsList, onOpen }: Props) => {
  const { data: signer } = useSigner();

  const { allDisabled, readyDisabled, pauseDisabled } = getButtonsDisabled(el);
  return (
    <HStack spacing={4} justifyContent="end" flex="0 0 160px">
      <ButtonGroup size="sm" isAttached variant="outline">
        <IconButton
          aria-label="Search database"
          icon={<FaPlay />}
          onClick={() =>
            handleButtonAction(
              ELECTION_ACTION.CONTINUE,
              el.id,
              signer,
              setElectionsList
            )
          }
          isDisabled={allDisabled || readyDisabled}
        />
        <IconButton
          aria-label="Search database"
          icon={<FaPause />}
          onClick={() =>
            handleButtonAction(
              ELECTION_ACTION.PAUSE,
              el.id,
              signer,
              setElectionsList
            )
          }
          isDisabled={allDisabled || pauseDisabled}
        />
        <IconButton
          aria-label="Search database"
          icon={<FaStop />}
          onClick={() =>
            handleButtonAction(
              ELECTION_ACTION.CANCEL,
              el.id,
              signer,
              setElectionsList
            )
          }
          isDisabled={allDisabled}
        />
      </ButtonGroup>

      <InfoIcon boxSize={6} cursor="pointer" onClick={onOpen} />
    </HStack>
  );
};

const handleButtonAction = async (
  action: string,
  id: string,
  signer: any,
  setElectionsList: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const client = getClient(signer);

  await updateBalance(client);

  if (action === ELECTION_ACTION.CONTINUE) await client.continueElection(id);
  if (action === ELECTION_ACTION.PAUSE) await client.pauseElection(id);
  if (action === ELECTION_ACTION.CANCEL) await client.cancelElection(id);

  setElectionsList([]);
};
export default ProcessListActionButtons;
