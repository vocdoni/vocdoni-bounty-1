import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';

const CreateElectionOptions = () => {
  const { register, getValues, watch } = useFormContext();
  // watch rerenders all the form
  watch('weightedVote');

  // useWatch rerenders the component
  useWatch({
    name: ['weightedVote'],
  });

  console.log('aa');

  return (
    <Box p={4} bg="gray.100" borderRadius={8}>
      <Box as="fieldset" p={4} pt={2} borderRadius={8} bg="white">
        <Flex direction="column" gap={4}>
          <Text as="legend" fontSize="1.3em">
            Election options
          </Text>
          <FormControl
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'start', md: 'end' }}
          >
            <FormLabel>End date:</FormLabel>
            <Input type="date" width="180px" {...register(`dates.end`)} />
          </FormControl>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Advanced options
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Flex
                  gap={{ base: 3, md: 8 }}
                  flexDirection={{ base: 'column', md: 'row' }}
                  alignItems={{ base: 'start', md: 'end' }}
                  mb={3}
                >
                  <FormControl display="flex" alignItems="center" width="auto">
                    <FormLabel pt={2}>Autostart</FormLabel>
                    <Checkbox {...register(`electionType.autoStart`)} />
                  </FormControl>
                  {!getValues().electionType.autoStart && (
                    <FormControl
                      display="flex"
                      flexDirection={{ base: 'column', sm: 'row' }}
                      alignItems={{ base: 'start', sm: 'end' }}
                    >
                      <FormLabel whiteSpace="nowrap">Start date:</FormLabel>
                      <Input
                        type="date"
                        width="180px"
                        {...register(`dates.start`)}
                      />
                    </FormControl>
                  )}
                </Flex>
                <Flex
                  gap={{ base: 4, sm: 3 }}
                  flexDirection={{ base: 'column', md: 'row' }}
                  alignItems={{ base: 'start', md: 'end' }}
                  mb={3}
                >
                  <FormControl display="flex" alignItems="center">
                    <FormLabel pt={2} whiteSpace="nowrap">
                      Weighted vote
                    </FormLabel>
                    <Checkbox {...register(`weightedVote`)} />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel pt={2}>Interruptible</FormLabel>
                    <Checkbox {...register(`electionType.interruptible`)} />
                  </FormControl>
                  <FormControl
                    display="flex"
                    alignItems="center"
                    whiteSpace="nowrap"
                  >
                    <FormLabel pt={2}>Secret until the end</FormLabel>
                    <Checkbox {...register(`electionType.secretUntilTheEnd`)} />
                  </FormControl>
                </Flex>
                <Flex>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel pt={2} whiteSpace="nowrap">
                      Max Vote Overwrites
                    </FormLabel>
                    <Input {...register(`maxVotesOverwrite`)} width={20} />
                  </FormControl>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Box>
    </Box>
  );
};

export default CreateElectionOptions;
