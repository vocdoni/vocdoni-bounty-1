import { Box, Text, useDisclosure } from '@chakra-ui/react';
import { PublishedElection } from '@vocdoni/sdk';
import { Link } from 'react-router-dom';
import WrapperListRow from '../Wrappers/WrapperListRow';
import ProcessListActionButtons from './ProcessListActionButtons';
import ProcessListInfoModal from './ProcessListInfoModal';

interface Props {
  el: PublishedElection;
  setElectionsList: React.Dispatch<React.SetStateAction<any[]>>;
}

const ProcessListRow = ({ el, setElectionsList }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ProcessListInfoModal el={el} isOpen={isOpen} onClose={onClose} />
      <WrapperListRow>
        <>
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
        </>
      </WrapperListRow>
    </>
  );
};

export default ProcessListRow;
