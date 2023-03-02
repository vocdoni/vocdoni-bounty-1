import { InfoIcon } from '@chakra-ui/icons';
import { ButtonGroup, HStack, IconButton } from '@chakra-ui/react';
import { useClientContext } from '@vocdoni/react-components';
import { PublishedElection } from '@vocdoni/sdk';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa';
import { TOKENS_BALANCE_MINIMUM } from '../../constants/tokensBalance';
import { getButtonsDisabled } from '../../lib/processList/buttonsDisabled';

interface Props {
  el: PublishedElection;
  setElectionsList: React.Dispatch<React.SetStateAction<PublishedElection[]>>;
  onOpen: () => void;
}

const ProcessListActionButtons = ({ el, setElectionsList, onOpen }: Props) => {
  const { client, balance } = useClientContext();

  const notBalance = balance < TOKENS_BALANCE_MINIMUM;

  const { allDisabled, readyDisabled, pauseDisabled } = getButtonsDisabled(el);

  return (
    <HStack spacing={4} justifyContent="end" flex="0 0 160px">
      <ButtonGroup size="sm" isAttached variant="outline">
        <IconButton
          aria-label="Search database"
          icon={<FaPlay />}
          onClick={async () => {
            await client.continueElection(el.id);
            setElectionsList([]);
            window.location.reload();
          }}
          isDisabled={allDisabled || readyDisabled || notBalance}
        />
        <IconButton
          aria-label="Search database"
          icon={<FaPause />}
          onClick={async () => {
            await client.pauseElection(el.id);
            setElectionsList([]);
            window.location.reload();
          }}
          isDisabled={allDisabled || pauseDisabled || notBalance}
        />
        <IconButton
          aria-label="Search database"
          icon={<FaStop />}
          onClick={async () => {
            await client.cancelElection(el.id);
            setElectionsList([]);
            window.location.reload();
          }}
          isDisabled={allDisabled || notBalance}
        />
      </ButtonGroup>

      <InfoIcon boxSize={6} cursor="pointer" onClick={onOpen} />
    </HStack>
  );
};

export default ProcessListActionButtons;
