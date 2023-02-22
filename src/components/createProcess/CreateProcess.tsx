import { Button, Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import CreateElectionOptions from './CreateElectionOptions';
import CreateProcessAddresses from './CreateProcessAddresses';
import CreateProcessHeader from './CreateProcessHeader';
import CreateProcessQuestions from './CreateProcessQuestions';

type FormValues = {
  titleElection: string;
  descriptionElection: string;
  electionType: {
    autoStart: boolean;
    interruptible: boolean;
    secretUntilTheEnd: boolean;
  };
  addresses: {
    address: string;
    weight: number;
  }[];
  questions: {
    titleQuestion: string;
    descriptionQuestion: string;
    options: {
      option: string;
    }[];
  }[];
};

const CreateProcess = () => {
  const { address } = useAccount();

  const methods = useForm<FormValues>({
    defaultValues: {
      titleElection: '',
      descriptionElection: '',
      electionType: {
        autoStart: true,
        interruptible: true,
        secretUntilTheEnd: true,
      },
      addresses: [
        { address, weight: 0 },
        { address: '', weight: 0 },
      ],
      questions: [
        {
          titleQuestion: '',
          descriptionQuestion: '',
          options: [{ option: '' }, { option: '' }],
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
        <CreateElectionOptions />
        <CreateProcessAddresses />
        <CreateProcessQuestions />
        <Button type="submit">Submit</Button>
      </Flex>
    </FormProvider>
  );
};

export default CreateProcess;
