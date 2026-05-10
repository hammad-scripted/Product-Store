import {
  Container,
  Flex,
  HStack,
  SliderMark,
  Button,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={'1140px'} px={4}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{
          base: 'column',
          sm: 'row',
        }}
        marginBottom={3}
      >
        <Text
          fontSize={{
            base: '22',
            sm: '28',
          }}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          textAlign={'center'}
          bgGradient={'linear(to-r, #26C6DA, #3B82F6)'}
          bgClip={'text'}
        >
          <Link to={'/'}>Product Store</Link>
        </Text>
        <HStack spacing={2} alignItems={'center'}>
          <Link to={'/create'}>
            <Button>
              <AddIcon boxSize={4} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};
