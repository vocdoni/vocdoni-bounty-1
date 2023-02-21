import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface props {
  question: {
    titleQuestion: string;
    descriptionQuestion: string;
    options: string[];
  };
  index: number;
  remove: () => void;
}
const CreateProcessQuestion = ({ question, index, remove }: props) => {
  const { register } = useFormContext();
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
        <Input {...register(`questions.${index}.titleQuestion` as const)} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={`questions.${index}.descriptionQuestion`}>
          Description
        </FormLabel>
        <Input
          {...register(`questions.${index}.descriptionQuestion` as const)}
        />
      </FormControl>
      <HStack justifyContent="space-between" mb={4} mt={8}>
        <FormLabel>Options</FormLabel>
        <IconButton type="button" icon={<AddIcon />} aria-label="Add option" />
      </HStack>
      {question.options.map((ch: any, idx: number) => (
        <FormControl key={idx}>
          <FormLabel>Option {idx + 1}</FormLabel>
          <Input {...register(`questions.${index}.choices.${idx}` as const)} />
        </FormControl>
      ))}
    </Box>
  );
};

export default CreateProcessQuestion;
