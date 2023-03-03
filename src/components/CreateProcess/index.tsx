import { Button, useDisclosure } from '@chakra-ui/react';
import { useClientContext } from '@vocdoni/react-components';
import { VocdoniSDKClient } from '@vocdoni/sdk';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { MODAL_TYPE } from '../../constants/modalType';
import {
  getPlainCensus,
  getWeightedCensus,
  handleElection,
} from '../../lib/sdk/sdk';
import ModalCustom from '../Modals/ModalCustom';
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

const a = async (client: any) => {
  console.log(await client.fetchAccountInfo());
};

const CreateProcess = () => {
  const { client, account } = useClientContext();

  a(client);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
    handleSubmitElec(data, client, onOpen, onClose);
  };

  return (
    <FormProvider {...methods}>
      <ModalCustom
        type={MODAL_TYPE.LOADING}
        isOpen={isOpen}
        onClose={onClose}
      />
      <WrapperForm onSubmit={methods.handleSubmit(onSubmit)}>
        <>
          <CreateProcessHeader />
          <CreateProcessSettings />
          <CreateProcessAddresses />
          <CreateProcessQuestions />
          <Button type="submit" _dark={{ bg: 'black.c90' }}>
            Submit
          </Button>
        </>
      </WrapperForm>
    </FormProvider>
  );
};

const handleSubmitElec = async (
  data: FormValues,
  client: VocdoniSDKClient,
  onOpen: () => void,
  onClose: () => void
) => {
  onOpen();
  await client.createAccount();
  try {
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
    onClose();
  }
};

export default CreateProcess;
