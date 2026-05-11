import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { useDisclosure } from '@chakra-ui/react';

import React from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product.js';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = React.useState(product);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleUpdate = async (pid, updatedProduct) => {
    const res = await updateProduct(pid, updatedProduct);

    if (res.success) {
      toast({
        title: 'Product Updated',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
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
            onClick={onOpen}
            aria-label="Edit Product"
          />

          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => handleDelete(product._id, updatedProduct)}
            aria-label="Delete Product"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.Image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    Image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdate(product._id, updatedProduct)}
            >
              Update
            </Button>

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
