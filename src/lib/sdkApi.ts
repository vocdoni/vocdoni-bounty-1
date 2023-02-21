import {
  Election,
  EnvOptions,
  PlainCensus,
  VocdoniSDKClient,
  WeightedCensus,
} from '@vocdoni/sdk';

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
export const getWeightedCensus = async (addresses: any) => {
  const census = new WeightedCensus();

  addresses.map((ad: any) => ({
    key: ad.address,
    weight: ad.weight,
  }));

  return census;
};

const addQuestions = (election: any, questions: any) => {
  const questionsFormatted = questions.map((question: any) => ({
    title: question.title,
    description: question.description,
    options: question.options.map((q: any, i: number) => ({
      title: q,
      value: i,
    })),
  }));

  questionsFormatted.forEach((q: any) =>
    election.addQuestion(q.title, q.description, q.options)
  );
};

export const handlerCreateElection = async (
  formValues: any,
  census: any,
  client: any
) => {
  const endDate = new Date();
  endDate.setHours(endDate.getHours() + 10);

  const election = Election.from({
    title: formValues.title,
    description: formValues.description,
    header: 'https://source.unsplash.com/random',
    streamUri: 'https://source.unsplash.com/random',
    endDate: endDate.getTime(),
    electionType: {
      autoStart: formValues.autostart,
      interruptible: formValues.interruptible,
      secretUntilTheEnd: formValues.encrypted,
    },

    voteType: { maxVoteOverwrites: Number(formValues.maxVoteOverwrites.times) },
    census,
  });
  addQuestions(election, formValues.questions);

  return await client.createElection(election);
};
