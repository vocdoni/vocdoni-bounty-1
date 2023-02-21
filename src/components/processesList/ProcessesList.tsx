import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSigner } from 'wagmi';
import { getClient } from '../../lib/sdkApi';
import ProcessesListFilters from './ProcessesListFilters';
import ProcessListRow from './ProcessListRow';

const IDS = [
  'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020000000003',
  'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020000000004',
  'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020400000005',
  'c5d2460186f7106dd8232134a62dd89b806e537d5eb11791e9a9020000000000',
];

const ProcessesList = () => {
  const [search, setSearch] = useState('');

  const { data: signer } = useSigner();

  const [electionsList, setElectionsList] = useState<any[]>([]);

  const electionsListFiltered = filterElections(electionsList, search);

  useEffect(() => {
    const client = getClient(signer);
    Promise.allSettled([
      client.fetchElection(IDS[0]),
      client.fetchElection(IDS[1]),
      client.fetchElection(IDS[2]),
      client.fetchElection(IDS[3]),
    ])
      .then((res) =>
        res.filter((el) => el.status === 'fulfilled').map((el: any) => el.value)
      )
      .then((res) => setElectionsList(res));
  }, [signer]);

  return (
    <Box m="16px auto" p={4} width={{ base: '90%', lg: '650px' }}>
      <ProcessesListFilters setSearch={setSearch} />
      <Flex direction="column" gap={4} mt={8} mx="auto">
        {electionsListFiltered.map((el: any) => (
          <ProcessListRow key={el.id} el={el} />
        ))}
      </Flex>
    </Box>
  );
};

const filterElections = (elections: any, search: string) => {
  if (!search) return [...elections];

  const lowerCaseSearch = search.toLowerCase();

  return elections.filter((el: any) =>
    el.title.default.toLowerCase().includes(lowerCaseSearch)
  );
};

export default ProcessesList;
