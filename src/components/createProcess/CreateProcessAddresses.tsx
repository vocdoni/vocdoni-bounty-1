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
  const { register, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'addresses',
  });

  const renderAddresses = (): JSX.Element[] => {
    return fields.map((add, i) => (
      <FormControl key={add.id} mb={4}>
        <Flex alignItems="center">
          <FormLabel whiteSpace="nowrap">{`Address ${i + 1}`}</FormLabel>
          {getValues().weightedVote && (
            <FormControl display="flex" alignItems="end" mb={2} ml={8}>
              <FormLabel>Weight:</FormLabel>
              <Input
                type="number"
                width={24}
                {...register(`addresses.${i}.weight` as const)}
              />
            </FormControl>
          )}
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
    ));
  };

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
        {renderAddresses()}
      </Box>
    </Box>
  );
};

export default CreateProcessAddresses;
