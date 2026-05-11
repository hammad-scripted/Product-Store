import { Container, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <Container maxW={'container.xl'} py={8}>
      <VStack spacing={8}>
        <Text
          fontSize={'30'}
          fontWeight={'bold'}
          bgGradient={'linear(to-r,cyan.400,blue.500)'}
          bgClip={'text'}
          textAlign={'center'}
        >
          Current Products in Store🚀
        </Text>

        <Text
          fontSize={'xl'}
          textAlign={'center'}
          fontWeight={'bold'}
          color={'gray.500'}
        >
          No products available 🥲{' '}
          <Link to={'/create'}>
            <Text
              as={'span'}
              color={'blue.500'}
              fontWeight={'bold'}
              _hover={{ textDecoration: 'underline' }}
            >
              Create a Product
            </Text>
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};
