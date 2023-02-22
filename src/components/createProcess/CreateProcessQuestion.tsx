import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface props {
  question: {
    titleQuestion: string;
    descriptionQuestion: string;
    options: string[];
  };
  index: number;
  remove: () => void;
}
const CreateProcessQuestion = ({ index, remove }: props) => {
  const { register } = useFormContext();
  const {
    fields,
    append,
    remove: removeOption,
  } = useFieldArray({
    name: `questions.${index}.options`,
  });

  return (
    <Box bg="white" p={4} borderRadius={8}>
      <HStack justify="space-between" mb={4}>
        <FormLabel>Question {index + 1}</FormLabel>

        <IconButton
          type="button"
          icon={<DeleteIcon />}
          aria-label={`Delete question ${index + 1}`}
          onClick={remove}
        />
      </HStack>
      <FormControl>
        <FormLabel htmlFor={`questions.${index}.titleQuestion`}>
          Title
        </FormLabel>
        <Input
          {...register(`questions.${index}.titleQuestion` as const)}
          placeholder="Title"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={`questions.${index}.descriptionQuestion`}>
          Description
        </FormLabel>
        <Input
          {...register(`questions.${index}.descriptionQuestion` as const)}
          placeholder="Description"
        />
      </FormControl>
      <HStack justifyContent="space-between" mb={4} mt={8}>
        <FormLabel>Options</FormLabel>
        <IconButton
          type="button"
          icon={<AddIcon />}
          aria-label="Add option"
          onClick={() => append({ option: '' })}
        />
      </HStack>
      {fields.map((_, idx: number) => (
        <FormControl key={idx} mb={4}>
          <Flex alignItems="center">
            <FormLabel>Option {idx + 1}</FormLabel>

            <IconButton
              ml="auto"
              type="button"
              icon={<DeleteIcon />}
              aria-label="delete option"
              onClick={() => removeOption(idx)}
            />
          </Flex>
          <Input
            {...register(`questions.${index}.options.${idx}.option` as const)}
            placeholder={`Option ${idx + 1}`}
          />
        </FormControl>
      ))}
    </Box>
  );
};

export default CreateProcessQuestion;
