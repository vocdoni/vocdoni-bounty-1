import { Button, Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import CreateProcessAddresses from './CreateProcessAddresses';
import CreateProcessHeader from './CreateProcessHeader';
import CreateProcessQuestions from './CreateProcessQuestions';

type FormValues = {
  titleElection: string;
  descriptionElection: string;
  addresses: {
    address: string;
    weight: number;
  }[];
  questions: {
    titleQuestion: string;
    descriptionQuestion: string;
    options: string[];
  }[];
};

const CreateProcess = () => {
  const { address } = useAccount();

  const methods = useForm<FormValues>({
    defaultValues: {
      titleElection: '',
      descriptionElection: '',
      addresses: [
        { address, weight: 0 },
        { address: '', weight: 0 },
      ],
      questions: [
        {
          titleQuestion: '',
          descriptionQuestion: '',
          options: ['', ''],
        },
      ],
    },
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <Flex
        as="form"
        direction="column"
        gap={4}
        m="16px auto"
        p={4}
        borderRadius={12}
        width={{ base: '90%', lg: '650px' }}
        boxShadow="0px 0px 8px 2px rgba(69,69,69,0.3)"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <CreateProcessHeader />
        <CreateProcessAddresses />
        <CreateProcessQuestions />
        <Button type="submit">Submit</Button>
      </Flex>
    </FormProvider>
  );
};

export default CreateProcess;
