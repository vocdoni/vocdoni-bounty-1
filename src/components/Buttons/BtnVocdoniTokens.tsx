import { IconButton } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/react';
import { VocdoniSDKClient } from '@vocdoni/sdk';
import { MODAL_TYPE } from '../../constants/modalType';
import { addTokens } from '../../lib/sdk/sdk';
import ModalCustom from '../Modals/ModalCustom';

interface Props {
  client: VocdoniSDKClient;
  balance: number;
}

const BtnVocdoniTokens = ({ balance, client }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ModalCustom
        isOpen={isOpen}
        onClose={onClose}
        type={MODAL_TYPE.LOADING}
      />
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
        cursor="default"
        _hover={{
          scale: 3,
        }}
      >
        <Text fontWeight="bold">{balance} Tokens</Text>
        <IconButton
          size="sm"
          icon={<AddIcon />}
          aria-label="Add tokens"
          onClick={() => addTokens(client, onOpen, onClose)}
        />
      </Flex>
    </>
  );
};

export default BtnVocdoniTokens;
