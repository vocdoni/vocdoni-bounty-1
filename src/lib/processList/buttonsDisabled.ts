import { ELECTION_ACTION, ELECTION_STATUS } from '../../constants/election';
import { getClient, updateBalance } from '../sdk/sdk';

interface PropsButtonsDisabled {
  allDisabled: boolean;
  readyDisabled: boolean;
  pauseDisabled: boolean;
}

export const getButtonsDisabled = (el: any) => {
  const now = new Date();

  const isStarted = now.getTime() > el.startDate.getTime();

  const buttonsDisabled: PropsButtonsDisabled = {
    allDisabled:
      !isStarted ||
      el.raw.status === ELECTION_STATUS.RESULTS ||
      el.raw.status === ELECTION_STATUS.CANCELED ||
      el.raw.status === ELECTION_STATUS.ENDED,
    readyDisabled: el.raw.status === ELECTION_STATUS.READY,
    pauseDisabled: el.raw.status === ELECTION_STATUS.PAUSED,
  };

  return buttonsDisabled;
};
