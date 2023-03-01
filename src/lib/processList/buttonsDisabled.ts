import { ElectionStatus } from '@vocdoni/sdk';

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
      el.status === ElectionStatus.RESULTS ||
      el.status === ElectionStatus.CANCELED ||
      el.status === ElectionStatus.ENDED,
    readyDisabled: el.status === ElectionStatus.READY,
    pauseDisabled: el.status === ElectionStatus.PAUSED,
  };

  return buttonsDisabled;
};
