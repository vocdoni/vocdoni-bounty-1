import {
  Button,
  Flex,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FaCheck, FaTimes } from 'react-icons/fa';
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
          <Text>Election type:</Text>
          <List ml={4}>
            <ListItem>
              <ListIcon as={el.electionType.autoStart ? FaCheck : FaTimes} />
              Autostart
            </ListItem>
            <ListItem>
              <ListIcon
                as={el.electionType.interruptible ? FaCheck : FaTimes}
              />
              Interruptible
            </ListItem>
            <ListItem>
              <ListIcon
                as={el.electionType.secretUntilTheEnd ? FaCheck : FaTimes}
              />
              Secret until the end
            </ListItem>
          </List>
          <Text>Creation date: {formatDate(el.creationTime)}</Text>
          <Text>Start date: {formatDate(el.startDate)}</Text>
          <Text>End date: {formatDate(el.endDate)}</Text>
          <Button alignSelf="center">
            <Link to={`process/${el.raw.electionId}`}>More info</Link>
          </Button>
        </Flex>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ProcessListInfoModal;
