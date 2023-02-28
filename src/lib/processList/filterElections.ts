import { PublishedElection } from '@vocdoni/sdk';
import { PropsFilters } from '../../components/ProcessesList';
import { ELECTION_STATUS } from '../../constants/election';

const filterByActive = (
  elections: PublishedElection[],
  filters: PropsFilters
) => {
  if (!filters.onlyCurrentElections) return [...elections];

  const now = new Date();

  return elections.filter(
    (el) =>
      now.getTime() < el.endDate.getTime() &&
      el.status !== ELECTION_STATUS.CANCELED &&
      el.status !== ELECTION_STATUS.ENDED &&
      el.status !== ELECTION_STATUS.RESULTS
  );
};

const filterByTitle = (
  elections: PublishedElection[],
  filters: PropsFilters
) => {
  if (!filters.search) return [...elections];

  const lowerCaseSearch = filters.search.toLowerCase();

  return elections.filter((el: PublishedElection) =>
    el.title.default.toLowerCase().includes(lowerCaseSearch)
  );
};

export const getElectionsToDisplay = (
  elections: PublishedElection[],
  filters: PropsFilters
) => {
  let filteredElections = filterByActive(elections, filters);

  filteredElections = filterByTitle(filteredElections, filters);

  return filteredElections;
};
