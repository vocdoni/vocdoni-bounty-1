import { Box, Flex, HStack, Spinner } from '@chakra-ui/react';
import { useClientContext } from '@vocdoni/react-components';
import { PublishedElection } from '@vocdoni/sdk';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { getElectionsToDisplay } from '../../lib/processList/filterElections';
import ProcessesListFilters from './ProcessesListFilters';
import ProcessListRow from './ProcessListRow';

export interface PropsFilters {
  search: string;
  onlyCurrentElections: boolean;
}

const IDS = [
  'c5d2460186f7106dd8232134a62dd89b806e537d5eb11791e9a9020000000000',
  'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef832350702040000002d',
];

const ProcessesList = () => {
  const methodsFilters = useForm<PropsFilters>({
    defaultValues: {
      search: '',
      onlyCurrentElections: false,
    },
  });

  const { client } = useClientContext();

  console.log(client);

  const [electionsList, setElectionsList] = useState<PublishedElection[]>([]);

  methodsFilters.watch(['onlyCurrentElections', 'search']);

  const electionsListFiltered = getElectionsToDisplay(
    electionsList,
    methodsFilters.getValues()
  );

  useEffect(() => {
    if (electionsList.length || !client) return;

    Promise.allSettled([
      client.fetchElection(IDS[0]),
      client.fetchElection(IDS[1]),
    ])
      .then((res) =>
        res.filter((el) => el.status === 'fulfilled').map((el: any) => el.value)
      )
      .then((res) => setElectionsList(res));
  }, [client, electionsList]);

  return (
    <Box m="16px auto" p={4} width={{ base: '97%', lg: '650px' }}>
      <FormProvider {...methodsFilters}>
        <ProcessesListFilters />
      </FormProvider>

      <HStack>
        {!electionsList.length && <Spinner size="lg" marginX="auto" mt={12} />}
      </HStack>

      <Flex direction="column" gap={4} mt={8} mx="auto">
        {electionsListFiltered?.map((el: any) => (
          <ProcessListRow
            key={el.id}
            el={el}
            setElectionsList={setElectionsList}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default ProcessesList;
