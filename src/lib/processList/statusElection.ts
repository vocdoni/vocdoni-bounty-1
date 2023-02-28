import { ELECTION_STATUS } from '../../constants/election';

export const getStatusElectionName = (status: number) => {
  if (status === ELECTION_STATUS.READY) return 'ready';
  if (status === ELECTION_STATUS.PAUSED) return 'paused';
  if (status === ELECTION_STATUS.CANCELED) return 'canceled';
  if (status === ELECTION_STATUS.ENDED) return 'ended';
  if (status === ELECTION_STATUS.RESULTS) return 'results';

  return 'undefined';
};
