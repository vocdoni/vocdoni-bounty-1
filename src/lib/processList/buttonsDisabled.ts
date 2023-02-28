import { ELECTION_STATUS } from '../../constants/election';

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
      el.status === ELECTION_STATUS.RESULTS ||
      el.status === ELECTION_STATUS.CANCELED ||
      el.status === ELECTION_STATUS.ENDED,
    readyDisabled: el.status === ELECTION_STATUS.READY,
    pauseDisabled: el.status === ELECTION_STATUS.PAUSED,
  };

  return buttonsDisabled;
};
