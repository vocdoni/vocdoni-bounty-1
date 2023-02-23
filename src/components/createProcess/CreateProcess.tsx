import { Button, Flex, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAccount, useSigner } from 'wagmi';
import {
  getClient,
  getPlainCensus,
  handlerCreateElection,
  updateBalance,
} from '../../lib/sdkApi';
import CreateProcessAddresses from './CreateProcessAddresses';
import CreateProcessHeader from './CreateProcessHeader';
import CreateProcessOptions from './CreateProcessOptions';
import CreateProcessQuestions from './CreateProcessQuestions';

type FormValues = {
  titleProcess: string;
  descriptionProcess: string;
  dates: {
    start: any;
    end: any;
  };
  electionType: {
    autoStart: boolean;
    interruptible: boolean;
    secretUntilTheEnd: boolean;
  };
  maxTimesOverwrite: number;
  weightedVote: boolean;
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
  // const { client } = useClientContext();

  const { data: signer } = useSigner();

  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      titleProcess: '',
      descriptionProcess: '',
      dates: {
        start: undefined,
        end: undefined,
      },
      electionType: {
        autoStart: true,
        interruptible: true,
        secretUntilTheEnd: true,
      },
      maxTimesOverwrite: 0,
      weightedVote: false,
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

  const onSubmit = (data: any) => {
    handleSubmit(data, signer, setIsLoading);
  };

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
        <CreateProcessOptions />
        <CreateProcessAddresses />
        <CreateProcessQuestions />
        <Button type="submit" _dark={{ bg: ' #0f141c' }}>
          {isLoading ? <Spinner width="20px" height="20px" /> : 'Submit'}
        </Button>
      </Flex>
    </FormProvider>
  );
};

const handleSubmit = async (
  data: FormValues,
  signer: any,
  setIsLoading: any
) => {
  setIsLoading(true);
  const client = getClient(signer);
  try {
    updateBalance(client);

    let census;

    // if (data.weightedVote) census = await getWeightedCensus(data.addresses);
    // else {
    //   const addresses = data.addresses.map((add) => add.address);
    //   census = await getPlainCensus(addresses);
    // }

    const addresses = data.addresses.map((add) => add.address);
    census = await getPlainCensus(addresses);

    const id = await handlerCreateElection(data, census, client);

    console.log('id', id);

    const info = await client.fetchElection(id);

    console.log('Process', info);
  } catch (err: any) {
    console.log(err.message);
  } finally {
    setIsLoading(false);
  }
};

export default CreateProcess;
