import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProcessListInfoModal from './ProcessListInfoModal';

interface props {
  el: any;
}

const ProcessListRow = ({ el }: props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { client } = useClientContext();

  return (
    <>
      <ProcessListInfoModal el={el} isOpen={isOpen} onClose={onClose} />
      <Flex
        mx="auto"
        py={3}
        px={5}
        alignItems="center"
        borderRadius={12}
        width={{ base: '90%', lg: '650px' }}
        boxShadow="0px 0px 8px 2px rgba(69,69,69,0.3)"
      >
        <Box isTruncated flex="1 1 auto" cursor="pointer">
          <Link to={`/process/${el.raw.electionId}`}>
            <Text width="100%" isTruncated title={el.title.default}>
              {el.title.default}
            </Text>
            <Text
              width="100%"
              color="gray.500"
              isTruncated
              title={el.raw.electionId}
            >
              {el.raw.electionId}
            </Text>
          </Link>
        </Box>
        <HStack spacing={4} justifyContent="end" flex="0 0 160px">
          <ButtonGroup size="sm" isAttached variant="outline">
            <IconButton
              aria-label="Search database"
              icon={<FaPlay />}
              onClick={() => console.log('play')}
            />
            <IconButton
              aria-label="Search database"
              icon={<FaPause />}
              onClick={() => console.log('pause')}
            />
            <IconButton
              aria-label="Search database"
              icon={<FaStop />}
              onClick={() => console.log('stop')}
            />
          </ButtonGroup>

          <InfoIcon boxSize={6} cursor="pointer" onClick={onOpen} />
        </HStack>
      </Flex>
    </>
  );
};

export const formatDate = (date: any) =>
  date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();

export default ProcessListRow;
