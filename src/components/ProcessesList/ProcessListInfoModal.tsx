import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { PublishedElection } from '@vocdoni/sdk';
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/processList/formatDate';
import { getStatusElectionName } from '../../lib/processList/statusElection';

interface Props {
  el: PublishedElection;
  isOpen: boolean;
  onClose: () => void;
}

const ProcessListInfoModal = ({ el, isOpen, onClose }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent width={{ sm: '97%', md: '80%', lg: '250px' }}>
      <ModalCloseButton />
      <ModalBody>
        <Flex direction="column" gap={4} p={4}>
          <Text>{getStatusElectionName(el).toUpperCase()}</Text>
          <Text>Creation date: {formatDate(el.creationTime)}</Text>
          <Text>Start date: {formatDate(el.startDate)}</Text>
          <Text>End date: {formatDate(el.endDate)}</Text>
          <Button alignSelf="center" mt={4}>
            <Link to={`/${el.id}`}>More info</Link>
          </Button>
        </Flex>
      </ModalBody>
    </ModalContent>
  </Modal>
);
export default ProcessListInfoModal;
