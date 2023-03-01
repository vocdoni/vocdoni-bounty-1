import { IconButton } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/layout';
import { VocdoniSDKClient } from '@vocdoni/sdk';
import { addTokens } from '../../lib/sdk/sdk';

interface Props {
  client: VocdoniSDKClient;
  balance: number;
}

const BtnVocdoniTokens = ({ balance, client }: Props) => (
  <Flex
    alignItems="center"
    gap={2}
    height="39px"
    px={2}
    borderRadius={6}
    boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px 0px"
    _dark={{
      bg: 'black.c90',
    }}
  >
    <Text fontWeight="bold">{balance} Tokens</Text>
    <IconButton
      isDisabled={balance > 10}
      size="sm"
      icon={<AddIcon />}
      aria-label="Add tokens"
      onClick={() => addTokens(client)}
    />
  </Flex>
);

export default BtnVocdoniTokens;
