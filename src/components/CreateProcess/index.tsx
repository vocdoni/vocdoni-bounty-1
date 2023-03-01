import { Button, Spinner } from '@chakra-ui/react';
import { useClientContext } from '@vocdoni/react-components';
import { VocdoniSDKClient } from '@vocdoni/sdk';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  addTokens,
  getPlainCensus,
  getWeightedCensus,
  handleElection,
} from '../../lib/sdk/sdk';
import WrapperForm from '../Wrappers/WrapperForm';
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
  const { client, balance, account } = useClientContext();

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
        { address: account?.address, weight: 0 },
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
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    handleSubmitElec(data, client, balance, setIsLoading);
  };

  return (
    <FormProvider {...methods}>
      <WrapperForm onSubmit={methods.handleSubmit(onSubmit)}>
        <>
          <CreateProcessHeader />
          <CreateProcessSettings />
          <CreateProcessAddresses />
          <CreateProcessQuestions />
          <Button
            type="submit"
            _dark={{ bg: ' #0f141c' }}
            isDisabled={balance < 10 || isLoading}
            _disabled={{
              cursor: 'copy',
            }}
            onClick={() => balance < 10 && addTokens(client)}
          >
            {balance < 10 ? (
              'Add tokens'
            ) : isLoading ? (
              <Spinner width="20px" height="20px" />
            ) : (
              'Submit'
            )}
          </Button>
        </>
      </WrapperForm>
    </FormProvider>
  );
};

const handleSubmitElec = async (
  data: FormValues,
  client: VocdoniSDKClient,
  balance: number,
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
