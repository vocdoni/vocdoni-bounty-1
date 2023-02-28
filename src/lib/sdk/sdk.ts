import {
  Election,
  EnvOptions,
  PlainCensus,
  VocdoniSDKClient,
  WeightedCensus,
} from '@vocdoni/sdk';
import {
  Addresses,
  FormValues,
  Questions,
} from '../../components/createProcess/CreateProcess';

export const getClient = (singer: any) =>
  new VocdoniSDKClient({
    env: EnvOptions.DEV,
    wallet: singer,
  });

export const updateBalance = async (client: any) => {
  const acc = await client.createAccount();
  try {
    if (!acc) {
      throw new Error('fetch account failed');
    }

    if (acc.balance <= 0) {
      await client.collectFaucetTokens();
    }
  } catch (e) {
    console.error('failed account creation', e);
  }
};

export const getPlainCensus = async (addresses: string[]) => {
  const census = new PlainCensus();
  census.add(addresses);

  return census;
};
export const getWeightedCensus = async (addresses: Addresses[]) => {
  const census = new WeightedCensus();

  // const addressesFormatted = addresses.map((ad: any) => ({
  //   key: ad.address,
  //   weight: ad.weight,
  // }));

  // census.add(addressesFormatted);

  addresses.forEach((add: any) => {
    census.add({
      key: add.address,
      weight: BigInt(add.weight),
    });
  });

  return census;
};

const addQuestions = (election: any, questions: Questions[]) => {
  const questionsFormatted = questions.map((question: any) => ({
    title: question.title,
    description: question.description,
    options: question.options.map((q: any, i: number) => ({
      title: q.option,
      value: i,
    })),
  }));

  questionsFormatted.forEach((q: any) =>
    election.addQuestion(q.title, q.description, q.options)
  );
};

export const handlerCreateElection = async (
  formValues: FormValues,
  census: any,
  client: any
) => {
  const startDate = new Date(formValues.dates.start);
  startDate.setHours(startDate.getHours());

  const endDate = new Date(formValues.dates.end);
  endDate.setHours(endDate.getHours());

  const election = Election.from({
    title: formValues.titleProcess,
    description: formValues.descriptionProcess,
    header: 'https://source.unsplash.com/random',
    streamUri: 'https://source.unsplash.com/random',
    startDate: formValues.electionType.autoStart
      ? undefined
      : startDate.getTime(),
    endDate: endDate.getTime(),
    electionType: {
      autoStart: formValues.electionType.autoStart,
      interruptible: formValues.electionType.interruptible,
      secretUntilTheEnd: formValues.electionType.secretUntilTheEnd,
    },
    voteType: { maxVoteOverwrites: Number(formValues.maxVoteOverwrites) },
    census,
  });
  addQuestions(election, formValues.questions);

  return await client.createElection(election);
};
