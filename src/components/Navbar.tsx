import { Box, Flex } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavLink } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import VocdoniIcon from './icons/VocdoniIcon';

const Navbar = () => {
  return (
    <Box as="header">
      <Flex
        as="nav"
        justifyContent="end"
        alignItems="center"
        gap={4}
        paddingTop={4}
        mb={8}
        sx={{
          '& .active': {
            color: 'green.vocdoni',
          },
        }}
      >
        <Box marginRight="auto">
          <NavLink to="/">
            <VocdoniIcon />
          </NavLink>
        </Box>

        <NavLink to="createlection">Create Process</NavLink>
        <NavLink to="electionslist">Elections List</NavLink>
        <ConnectButton accountStatus="avatar" chainStatus="icon" />

        <ColorModeSwitcher mb={1} size="sm" justifySelf="flex-end" />
      </Flex>
    </Box>
  );
};

export default Navbar;
