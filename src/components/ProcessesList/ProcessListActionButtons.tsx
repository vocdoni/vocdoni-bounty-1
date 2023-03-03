import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useClientContext } from '@vocdoni/react-components';
import {
  ElectionStatus,
  PublishedElection,
  VocdoniSDKClient,
} from '@vocdoni/sdk';
import { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);

  const { allDisabled, readyDisabled, pauseDisabled } = getButtonsDisabled(el);

  const disabledButton = balance < TOKENS_BALANCE_MINIMUM || allDisabled;

  return (
    <HStack spacing={4} justifyContent="end" flex="0 0 160px">
      <Box position="relative">
        <ButtonGroup size="sm" isAttached variant="outline" position="relative">
          {isLoading ? (
            <Flex
              justifyContent="center"
              alignItems="center"
              marginRight="35px"
            >
              <Spinner width="20px" height="20px" />
            </Flex>
          ) : (
            <>
              <IconButton
                aria-label="Search database"
                icon={<FaPlay />}
                onClick={() =>
                  handleAction(
                    ElectionStatus.READY,
                    el.id,
                    client,
                    setElectionsList,
                    setIsLoading
                  )
                }
                isDisabled={disabledButton || readyDisabled}
              />
              <IconButton
                aria-label="Search database"
                icon={<FaPause />}
                onClick={() =>
                  handleAction(
                    ElectionStatus.PAUSED,
                    el.id,
                    client,
                    setElectionsList,
                    setIsLoading
                  )
                }
                isDisabled={disabledButton || pauseDisabled}
              />
              <IconButton
                aria-label="Search database"
                icon={<FaStop />}
                onClick={() =>
                  handleAction(
                    ElectionStatus.CANCELED,
                    el.id,
                    client,
                    setElectionsList,
                    setIsLoading
                  )
                }
                isDisabled={disabledButton}
              />
            </>
          )}
        </ButtonGroup>
        {balance < TOKENS_BALANCE_MINIMUM && (
          <Text
            position="absolute"
            bottom="-30px"
            fontWeight="bold"
            zIndex="10"
            height="100%"
          >
            Add Tokens
          </Text>
        )}
      </Box>

      <InfoIcon boxSize={6} cursor="pointer" onClick={onOpen} />
    </HStack>
  );
};

const handleAction = async (
  action: string,
  id: string,
  client: VocdoniSDKClient,
  setElectionsList: React.Dispatch<React.SetStateAction<PublishedElection[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);
  try {
    if (action === ElectionStatus.READY) await client.continueElection(id);
    if (action === ElectionStatus.PAUSED) await client.pauseElection(id);
    if (action === ElectionStatus.CANCELED) await client.cancelElection(id);
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
    setElectionsList([]);
  }
};

export default ProcessListActionButtons;
