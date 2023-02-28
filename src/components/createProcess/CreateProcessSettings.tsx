import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';
import CreateProcessAdvancedSettings from './CreateProcessAdvancedSettings';

const CreateProcessSettings = () => {
  const { register, getValues, watch } = useFormContext();
  // watch rerenders all the form
  watch('weightedVote');

  // useWatch rerenders the component
  useWatch({
    name: ['electionType'],
  });

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
        <Flex direction="column" gap={4}>
          <Text as="legend" fontSize="1.3em">
            Election settings
          </Text>
          <FormControl
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'start', md: 'end' }}
          >
            <FormLabel>End date:</FormLabel>
            <Input
              type="date"
              width="180px"
              {...register(`dates.end`, { required: true })}
            />
          </FormControl>
          <CreateProcessAdvancedSettings
            register={register}
            getValues={getValues}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default CreateProcessSettings;
