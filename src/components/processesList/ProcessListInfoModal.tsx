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
import { Link } from 'react-router-dom';
import { formatDate } from './ProcessListRow';

interface props {
  el: any;
  isOpen: any;
  onClose: () => void;
}

const ProcessListInfoModal = ({ el, isOpen, onClose }: props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <Flex direction="column" gap={4} p={4}>
          <Text>State: {el.raw.status.toLowerCase()}</Text>
          <Text>Creation date: {formatDate(el.creationTime)}</Text>
          <Text>Start date: {formatDate(el.startDate)}</Text>
          <Text>End date: {formatDate(el.endDate)}</Text>
          <Button alignSelf="center" mt={4}>
            <Link to={`process/${el.raw.electionId}`}>More info</Link>
          </Button>
        </Flex>
      </ModalBody>
    </ModalContent>
  </Modal>
);
export default ProcessListInfoModal;
