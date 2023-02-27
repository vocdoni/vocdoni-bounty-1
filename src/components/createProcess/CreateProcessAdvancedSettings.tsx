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
} from '@chakra-ui/react';
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';

interface Props {
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

const CreateProcessAdvancedSettings = ({ register, getValues }: Props) => (
  <Accordion allowToggle>
    <AccordionItem>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          Advanced settings
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
              <Input type="date" width="180px" {...register(`dates.start`)} />
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
          <FormControl display="flex" alignItems="center" whiteSpace="nowrap">
            <FormLabel pt={2}>Secret until the end</FormLabel>
            <Checkbox {...register(`electionType.secretUntilTheEnd`)} />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl display="flex" alignItems="center">
            <FormLabel pt={2} whiteSpace="nowrap">
              Max Vote Overwrites
            </FormLabel>
            <Input
              type="number"
              {...register(`maxVoteOverwrites`)}
              width={20}
            />
          </FormControl>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default CreateProcessAdvancedSettings;
