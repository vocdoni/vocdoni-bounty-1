import { Box, Flex, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useClientContext } from '@vocdoni/react-components';
import { PublishedElection } from '@vocdoni/sdk';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TOKENS_BALANCE_MINIMUM } from '../../constants/tokensBalance';
import { getElectionsToDisplay } from '../../lib/processList/filterElections';
import ProcessesListFilters from './ProcessesListFilters';
import ProcessListRow from './ProcessListRow';

export interface PropsFilters {
  search: string;
  onlyCurrentElections: boolean;
}

const IDS = [
  'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020400000000',
];

const ProcessesList = () => {
  const methodsFilters = useForm<PropsFilters>({
    defaultValues: {
      search: '',
      onlyCurrentElections: false,
    },
  });

  const { client, balance } = useClientContext();

  const [electionsList, setElectionsList] = useState<PublishedElection[]>([]);

  methodsFilters.watch(['onlyCurrentElections', 'search']);

  const electionsListFiltered = getElectionsToDisplay(
    electionsList,
    methodsFilters.getValues()
  );

  useEffect(() => {
    if (electionsList.length || !client) return;

    Promise.allSettled([client.fetchElection(IDS[0])])
      .then((res) =>
        res.filter((el) => el.status === 'fulfilled').map((el: any) => el.value)
      )
      .then((res) => setElectionsList(res));
  }, [client, electionsList.length]);

  return (
    <Box m="16px auto" p={4} width={{ base: '97%', lg: '650px' }}>
      <VStack>
        {balance < TOKENS_BALANCE_MINIMUM && (
          <Text color="red.600">Not enough tokens to operate</Text>
        )}
      </VStack>
      <FormProvider {...methodsFilters}>
        <ProcessesListFilters />
      </FormProvider>

      <HStack>
        {!electionsList.length && <Spinner size="lg" marginX="auto" mt={12} />}
      </HStack>

      <Flex direction="column" gap={4} mt={8} mx="auto">
        {electionsListFiltered?.map((el: PublishedElection) => (
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
