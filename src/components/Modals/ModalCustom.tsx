import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { PublishedElection } from '@vocdoni/sdk';
import { Link } from 'react-router-dom';
import { MODAL_TYPE } from '../../constants/modalType';
import { formatDate } from '../../lib/processList/formatDate';
import { getStatusElectionName } from '../../lib/processList/statusElection';

interface Props {
  el?: PublishedElection;
  type: number;
  isOpen: boolean;
  onClose: () => void;
}

const ModalCustom = ({ el, type, isOpen, onClose }: Props) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    closeOnOverlayClick={type !== MODAL_TYPE.LOADING}
  >
    <ModalOverlay />
    <ModalContent py={12}>
      {type !== MODAL_TYPE.LOADING && <ModalCloseButton />}
      <ModalBody>
        {type === MODAL_TYPE.INFO && el && (
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap={4}
            p={4}
          >
            <Text>{getStatusElectionName(el).toUpperCase()}</Text>
            <Text>Creation date: {formatDate(el.creationTime)}</Text>
            <Text>Start date: {formatDate(el.startDate)}</Text>
            <Text>End date: {formatDate(el.endDate)}</Text>
            <Button alignSelf="center" mt={12}>
              <Link to={`/${el.id}`}>More info</Link>
            </Button>
          </Flex>
        )}
        {type === MODAL_TYPE.LOADING && (
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap={12}
          >
            <Spinner width={20} height={20} />
            <Box>
              <Text textAlign="center">Please sign the transaction </Text>
              <Text textAlign="center">and don't refresh the page</Text>
            </Box>
          </Flex>
        )}
        {type === MODAL_TYPE.ADD_TOKENS && <Text>Insuficients tokens</Text>}
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ModalCustom;
