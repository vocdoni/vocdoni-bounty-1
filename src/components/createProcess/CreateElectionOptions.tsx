import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const CreateElectionOptions = () => {
  const { register } = useFormContext();
  return (
    <Box p={4} bg="gray.100" borderRadius={8}>
      <Box as="fieldset" p={4} pt={2} borderRadius={8} bg="white">
        <Flex direction="column" gap={4}>
          <Text as="legend" fontSize="1.3em">
            Election options
          </Text>
          <HStack>
            <FormControl
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <FormLabel htmlFor="encrypted" pt={2}>
                Autostart
              </FormLabel>
              <Checkbox {...register(`electionType.autoStart`)} />
            </FormControl>
            <FormControl
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <FormLabel htmlFor="encrypted" pt={2}>
                Encrypted
              </FormLabel>
              <Checkbox {...register(`electionType.interruptible`)} />
            </FormControl>
            <FormControl
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <FormLabel htmlFor="encrypted" pt={2}>
                Secret until the end
              </FormLabel>
              <Checkbox {...register(`electionType.secretUntilTheEnd`)} />
            </FormControl>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default CreateElectionOptions;
