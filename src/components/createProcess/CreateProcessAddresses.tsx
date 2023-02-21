import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const CreateProcessAddresses = () => {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'addresses',
  });

  return (
    <Box p={4} bg="gray.100" borderRadius={8}>
      <Box as="fieldset" p={4} pt={2} borderRadius={8} bg="white">
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
        {fields.map((add, i) => (
          <FormControl key={add.id} mb={4}>
            <Flex alignItems="center">
              <FormLabel htmlFor={`addresses.${i}.address`}>{`Address ${
                i + 1
              }`}</FormLabel>

              <IconButton
                ml="auto"
                type="button"
                icon={<DeleteIcon />}
                aria-label="delete address"
                onClick={() => remove(i)}
              />
            </Flex>
            <Input
              {...register(`addresses.${i}.address` as const)}
              placeholder={`Address ${i + 1}`}
            />
          </FormControl>
        ))}
      </Box>
    </Box>
  );
};

export default CreateProcessAddresses;
