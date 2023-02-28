import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { PublishedElection } from '@vocdoni/sdk';
import { Link } from 'react-router-dom';
import ProcessListActionButtons from './ProcessListActionButtons';
import ProcessListInfoModal from './ProcessListInfoModal';

interface Props {
  el: PublishedElection;
  setElectionsList: React.Dispatch<React.SetStateAction<any[]>>;
}

const ProcessListRow = ({ el, setElectionsList }: Props) => {
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
        _dark={{ boxShadow: '0px 0px 8px 2px #333f57' }}
      >
        <Box isTruncated flex="1 1 auto" cursor="pointer">
          <Link to={`/${el.id}`}>
            <Text width="100%" isTruncated title={el.title.default}>
              {el.title.default}
            </Text>
            <Text width="100%" color="gray.500" isTruncated title={el.id}>
              {el.id}
            </Text>
          </Link>
        </Box>
        <ProcessListActionButtons
          el={el}
          setElectionsList={setElectionsList}
          onOpen={onOpen}
        />
      </Flex>
    </>
  );
};

export const formatDate = (date: any) =>
  date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();

export default ProcessListRow;
