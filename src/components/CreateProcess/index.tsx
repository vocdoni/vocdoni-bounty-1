import { Button, Flex, Spinner } from '@chakra-ui/react';
import { useClientContext } from '@vocdoni/react-components';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import {
  getPlainCensus,
  getWeightedCensus,
  handleElection,
} from '../../lib/sdk/sdk';
import CreateProcessAddresses from './CreateProcessAddresses';
import CreateProcessHeader from './CreateProcessHeader';
import CreateProcessQuestions from './CreateProcessQuestions';
import CreateProcessSettings from './CreateProcessSettings';

export interface FormValues {
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
  maxVoteOverwrites: number;
  weightedVote: boolean;
  addresses: Addresses[];
  questions: Questions[];
}

export interface Questions {
  titleQuestion: string;
  descriptionQuestion: string;
  options: {
    option: string;
  }[];
}

export interface Addresses {
  address: string;
  weight: number;
}

const CreateProcess = () => {
  const { address } = useAccount();

  const { client, balance } = useClientContext();

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
      maxVoteOverwrites: 0,
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

  const onSubmit = (data: FormValues) => {
    handleSubmit(data, client, balance, setIsLoading);
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
        width={{ base: '98%', lg: '650px' }}
        boxShadow="0px 0px 8px 2px rgba(69,69,69,0.3)"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <CreateProcessHeader />
        <CreateProcessSettings />
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
  client: any,
  balance: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);

  try {
    if (balance < 20) await client.collectFaucetTokens();

    let census;

    if (data.weightedVote) census = await getWeightedCensus(data.addresses);
    else {
      const addresses = data.addresses.map((add) => add.address);
      census = await getPlainCensus(addresses);
    }

    const election = await handleElection(data, census, client);

    const id = await client.createElection(election);

    console.log('id', id);

    const info = await client.fetchElection(id);

    console.log(info);
  } catch (err: any) {
    console.log(err.message);
  } finally {
    setIsLoading(false);
  }
};

export default CreateProcess;
