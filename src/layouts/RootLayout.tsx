import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <Flex
      paddingX={4}
      flexDirection="column"
      minHeight="100vh"
      maxWidth="1200px"
      margin="0 auto"
    >
      <Box mb={8}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default RootLayout;
