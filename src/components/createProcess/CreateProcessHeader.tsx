import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const CreateProcessHeader = () => {
  const { register } = useFormContext();
  return (
    <Box p={4} bg="gray.100" borderRadius={8}>
      <Box as="fieldset" p={4} pt={2} borderRadius={8} bg="white">
        <FormControl mb={4}>
          <FormLabel htmlFor={'titleProcess'} fontSize="1.3em">
            Title
          </FormLabel>
          <Input {...register('titleProcess')} placeholder="Title" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={'descriptionProcess'}>Description</FormLabel>
          <Input
            {...register('descriptionProcess')}
            placeholder="Description"
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default CreateProcessHeader;
