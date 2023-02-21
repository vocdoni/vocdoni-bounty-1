import { SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

interface props {
  setSearch: any;
}

const ProcessesListFilters = ({ setSearch }: props) => {
  return (
    <Flex
      as="fieldset"
      direction="column"
      gap={4}
      m="16px auto"
      p={4}
      borderRadius={12}
      width={{ base: '90%', lg: '650px' }}
      boxShadow="0px 0px 8px 2px rgba(69,69,69,0.3)"
    >
      <FormControl>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            placeholder="Search by title"
            pl={10}
            borderRadius={10}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </FormControl>
    </Flex>
  );
};

export default ProcessesListFilters;
