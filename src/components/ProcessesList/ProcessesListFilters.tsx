import { SearchIcon } from '@chakra-ui/icons';
import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const ProcessesListFilters = () => {
  const { register } = useFormContext();
  return (
    <Flex
      as="fieldset"
      direction={{ base: 'column', md: 'row' }}
      gap={4}
      m="16px auto"
      p={4}
      borderRadius={12}
      width={{ base: '90%', lg: '650px' }}
      boxShadow="0px 0px 8px 2px rgba(69,69,69,0.3)"
      _dark={{ boxShadow: '0px 0px 8px 2px #333f57' }}
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
            {...register('search')}
          />
        </InputGroup>
      </FormControl>
      <FormControl display="flex" alignItems="center" width="auto">
        <FormLabel pt={2} whiteSpace="nowrap">
          Only active elections
        </FormLabel>
        <Checkbox {...register(`onlyCurrentElections`)} />
      </FormControl>
    </Flex>
  );
};

export default ProcessesListFilters;
