// import { Box, Flex } from '@chakra-ui/react';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { NavLink } from 'react-router-dom';
// import { ColorModeSwitcher } from '../../ColorModeSwitcher';
// import VocdoniIcon from '../Icons/VocdoniIcon';

// const Navbar = () => {
//   return (
//     <Box as="header">
//       <Flex
//         as="nav"
//         justifyContent="end"
//         alignItems="center"
//         gap={4}
//         paddingTop={4}
//         mb={8}
//         sx={{
//           '& .active': {
//             color: 'green.vocdoni',
//           },
//         }}
//       >
//         <Box marginRight="auto">
//           <NavLink to="/">
//             <VocdoniIcon />
//           </NavLink>
//         </Box>

// <NavLink to="createprocess">Create Process</NavLink>
// <NavLink to="processeslist">Processes List</NavLink>
// <ConnectButton accountStatus="avatar" chainStatus="icon" />

// <ColorModeSwitcher mb={1} size="sm" justifySelf="flex-end" />
// <IconButton
//             size={'md'}
//             icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
//             aria-label={'Open Menu'}
//             display={{ md: 'none' }}
//             onClick={isOpen ? onClose : onOpen}
//           />
//       </Flex>
//     </Box>
//   );
// };

// export default Navbar;

import { NavLink } from 'react-router-dom';
import VocdoniIcon from '../Icons/VocdoniIcon';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  ListItem,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const Navbar = () => {
  const { isConnected } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="nav">
      <Flex
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

        <Box display={{ base: 'none', md: 'flex' }}>
          <UnorderedList display="flex" alignItems="center" gap={4}>
            {isConnected && (
              <>
                <ListItem listStyleType="none">
                  <NavLink to="createprocess">Create Process</NavLink>
                </ListItem>
                <ListItem listStyleType="none">
                  <NavLink to="processeslist">Processes List</NavLink>
                </ListItem>
              </>
            )}
            <ListItem listStyleType="none">
              <ConnectButton accountStatus="avatar" chainStatus="icon" />
            </ListItem>
            <ListItem listStyleType="none">
              <ColorModeSwitcher mb={1} size="sm" justifySelf="flex-end" />
            </ListItem>
          </UnorderedList>
        </Box>

        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      {isOpen ? (
        <Box
          display={{ md: 'none' }}
          position="absolute"
          left={0}
          bg="white"
          _dark={{
            bg: '#1A202C',
          }}
          width="100%"
          zIndex={10}
          boxShadow="0px 10px 12px 2px rgba(69,69,69,0.3)"
        >
          <UnorderedList
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={6}
            p={4}
          >
            <ListItem listStyleType="none">
              <ConnectButton accountStatus="avatar" chainStatus="icon" />
            </ListItem>
            {isConnected && (
              <>
                <ListItem listStyleType="none">
                  <Button onClick={onClose}>
                    <NavLink to="createprocess">Create Process</NavLink>
                  </Button>
                </ListItem>
                <ListItem listStyleType="none">
                  <Button onClick={onClose}>
                    <NavLink to="processeslist">Processes List</NavLink>
                  </Button>
                </ListItem>
              </>
            )}
            <ListItem listStyleType="none">
              <ColorModeSwitcher mb={1} size="sm" justifySelf="flex-end" />
            </ListItem>
          </UnorderedList>
        </Box>
      ) : null}
    </Box>
  );
};
export default Navbar;
