import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import CreateProcessQuestionOptions from './CreateProcessQuestionOptions';

interface Props {
  index: number;
  remove: () => void;
}
const CreateProcessQuestion = ({ index, remove }: Props) => {
  const { register } = useFormContext();
  const {
    fields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    name: `questions.${index}.options`,
  });

  return (
    <Box bg="white" p={4} borderRadius={8} _dark={{ bg: '#1A202C' }}>
      <HStack justify="space-between" mb={4}>
        <FormLabel>Question {index + 1}</FormLabel>

        <IconButton
          type="button"
          icon={<DeleteIcon />}
          aria-label={`Delete question ${index + 1}`}
          onClick={remove}
        />
      </HStack>
      <FormControl mb={4}>
        <FormLabel>Title</FormLabel>
        <Input
          {...register(`questions.${index}.titleQuestion` as const)}
          placeholder="Title"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          {...register(`questions.${index}.descriptionQuestion` as const)}
          placeholder="Description"
        />
      </FormControl>

      <CreateProcessQuestionOptions
        fields={fields}
        register={register}
        removeOption={removeOption}
        appendOption={appendOption}
        index={index}
      />
    </Box>
  );
};

export default CreateProcessQuestion;
