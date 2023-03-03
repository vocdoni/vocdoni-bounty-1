import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup,
  HStack,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useClientContext } from '@vocdoni/react-components';
import {
  ElectionStatus,
  PublishedElection,
  VocdoniSDKClient,
} from '@vocdoni/sdk';
import { useState } from 'react';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa';
import { MODAL_TYPE } from '../../constants/modalType';
import { getButtonsDisabled } from '../../lib/processList/buttonsDisabled';
import ModalCustom from '../Modals/ModalCustom';

interface Props {
  el: PublishedElection;
  setElectionsList: React.Dispatch<React.SetStateAction<PublishedElection[]>>;
}

const ProcessListActionButtons = ({ el, setElectionsList }: Props) => {
  const { client } = useClientContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modalType, setModalType] = useState(MODAL_TYPE.CLOSE);

  const { allDisabled, readyDisabled, pauseDisabled } = getButtonsDisabled(el);

  return (
    <HStack spacing={4} justifyContent="end" flex="0 0 160px">
      <ModalCustom isOpen={isOpen} onClose={onClose} type={modalType} el={el} />
      <Box position="relative">
        <ButtonGroup size="sm" isAttached variant="outline" position="relative">
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
                  setModalType,
                  onOpen,
                  onClose
                )
              }
              isDisabled={allDisabled || readyDisabled}
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
                  setModalType,
                  onOpen,
                  onClose
                )
              }
              isDisabled={allDisabled || pauseDisabled}
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
                  setModalType,
                  onOpen,
                  onClose
                )
              }
              isDisabled={allDisabled}
            />
          </>
        </ButtonGroup>
      </Box>

      <InfoIcon
        boxSize={6}
        cursor="pointer"
        onClick={() => {
          setModalType(MODAL_TYPE.INFO);
          onOpen();
        }}
      />
    </HStack>
  );
};

const handleAction = async (
  action: string,
  id: string,
  client: VocdoniSDKClient,
  setElectionsList: React.Dispatch<React.SetStateAction<PublishedElection[]>>,
  setModalType: React.Dispatch<React.SetStateAction<number>>,
  onOpen: () => void,
  onClose: () => void
) => {
  setModalType(MODAL_TYPE.LOADING);
  onOpen();
  try {
    if (action === ElectionStatus.READY) await client.continueElection(id);
    if (action === ElectionStatus.PAUSED) await client.pauseElection(id);
    if (action === ElectionStatus.CANCELED) await client.cancelElection(id);
  } catch (err) {
    console.log(err);
  } finally {
    setModalType(MODAL_TYPE.CLOSE);
    onClose();
    setElectionsList([]);
  }
};

export default ProcessListActionButtons;
