import {
  Container,
  Heading,
  VStack,
  Box,
  Input,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import React from 'react';

import { useProductStore } from './../store/product.js';

export const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: '',
    price: '',
    Image: '',
  });
  const toast = useToast();
  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'}>
          Create Product
        </Heading>

        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded={'lg'}
          shadow={'md'}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <Input
              placeholder="Price"
              type="number"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.Image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, Image: e.target.value })
              }
            />

            <Button colorScheme="blue" w={'full'} onClick={handleAddProduct}>
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
