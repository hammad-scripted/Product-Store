import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import React from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product.js';

const ProductCard = ({ product }) => {
  const toast = useToast();

  const { deleteProduct, updateProduct } = useProductStore();

  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?',
    );

    if (!confirmDelete) return;

    const res = await deleteProduct(product._id);

    if (res.success) {
      toast({
        title: 'Product Deleted',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error',
        description: res.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleUpdate = async () => {};
  return (
    <Box
      bg={bgColor}
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
    >
      <Image
        src={product.Image}
        alt={product.name}
        h={48}
        w={'full'}
        objectFit={'cover'}
      />

      <Box p={4}>
        <Heading as={'h3'} mb={2} size={'md'} color={textColor}>
          {product.name}
        </Heading>

        <Text fontSize={'xl'} fontWeight={'bold'} color={textColor} mb={4}>
          ${product.price.toFixed(2)}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            colorScheme="blue"
            onClick={handleUpdate}
          />

          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={handleDelete}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
