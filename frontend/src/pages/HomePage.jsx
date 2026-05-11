import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product.js';
import ProductCard from '../components/ProductCard.jsx';
import { Spinner } from '@chakra-ui/react';

export const HomePage = () => {
  const [loading, setLoading] = useState(true);

  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      await fetchProducts();

      setLoading(false);
    };

    loadProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={'container.xl'} py={8}>
      {loading ? (
        <VStack>
          <Spinner size={'xl'} color={'blue.500'} />
        </VStack>
      ) : (
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

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            w={'full'}
          >
            {products.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </SimpleGrid>

          {products.length === 0 && (
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
          )}
        </VStack>
      )}
    </Container>
  );
};
