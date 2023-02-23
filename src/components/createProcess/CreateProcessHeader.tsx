import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const CreateProcessHeader = () => {
  const { register } = useFormContext();
  return (
    <Box p={4} bg="gray.100" borderRadius={8} _dark={{ bg: ' #0f141c' }}>
      <Box
        as="fieldset"
        p={4}
        pt={2}
        borderRadius={8}
        bg="white"
        _dark={{ bg: '#1A202C' }}
      >
        <FormControl mb={4}>
          <FormLabel fontSize="1.3em">Title</FormLabel>
          <Input {...register('titleProcess')} placeholder="Title" />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
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
