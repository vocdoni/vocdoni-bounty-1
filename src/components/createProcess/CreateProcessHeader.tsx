import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const CreateProcessHeader = () => {
  const { register } = useFormContext();
  return (
    <Box p={4} bg="gray.100" borderRadius={8}>
      <Box as="fieldset" p={4} pt={2} borderRadius={8} bg="white">
        <FormControl>
          <FormLabel htmlFor={'titleElection'}>Title</FormLabel>
          <Input {...register('titleElection')} placeholder="Title" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={'descriptionElection'}>Description</FormLabel>
          <Input
            {...register('descriptionElection')}
            placeholder="Description"
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default CreateProcessHeader;
