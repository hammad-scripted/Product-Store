import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
const ProductCard = ({ product }) => {
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bgColor = useColorModeValue('white', 'gray.800');
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
        <Heading as={'h3'} mb={'2'} size={'md'} color={'textColor'}>
          {product.name}
        </Heading>
        <Text fontSize={'xl'} fontWeight={'bold'} color={'textColor'} mb={'4'}>
          ${product.price.toFixed(2)}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue"></IconButton>
          <IconButton icon={<DeleteIcon />} colorScheme="red"></IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
