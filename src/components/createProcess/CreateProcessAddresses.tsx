import { AddIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Text } from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import CreateProcessAddress from './CreateProcessAddress';

const CreateProcessAddresses = () => {
  const { register, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'addresses',
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
        <HStack justify="space-between" mb={2}>
          <Text as="legend" fontSize="1.3em">
            Addresses
          </Text>
          <IconButton
            ml="auto"
            type="button"
            icon={<AddIcon />}
            aria-label="addresses"
            onClick={() => append({ address: '', weight: 0 })}
          />
        </HStack>
        <CreateProcessAddress
          fields={fields}
          getValues={getValues}
          register={register}
          remove={remove}
        />
      </Box>
    </Box>
  );
};

export default CreateProcessAddresses;
