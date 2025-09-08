import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  FormErrorMessage,
  Textarea,
  Select,
  Badge,
  Flex,
  AspectRatio,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  ScaleFade,
} from "@chakra-ui/react";
import { useProductStore } from "../store/Product.js";
import { useState, useRef, useEffect } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImageAlert, setShowImageAlert] = useState(false);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const modalBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const initialRef = useRef(null);
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    
    if (!updatedProduct.name.trim()) {
      newErrors.name = "Product name is required";
    }
    
    if (!updatedProduct.price || parseFloat(updatedProduct.price) <= 0) {
      newErrors.price = "Valid price is required";
    }
    
    if (!updatedProduct.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!isValidUrl(updatedProduct.image)) {
      newErrors.image = "Please enter a valid URL";
      setShowImageAlert(true);
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper function to validate URLs
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProductData) => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    const { success, message } = await updateProduct(pid, updatedProductData);
    setIsSubmitting(false);
    
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      onClose();
      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Reset errors when modal closes
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setUpdatedProduct(product);
      setShowImageAlert(false);
    }
  }, [isOpen, product]);

  return (
    <>
      <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
        position="relative"
        border="1px"
        borderColor={borderColor}
      >
        <AspectRatio ratio={4 / 3}>
          <Image 
            src={product.image} 
            alt={product.name} 
            objectFit="cover"
            fallback={
              <Box bg="gray.100" display="flex" alignItems="center" justifyContent="center">
                <Text color="gray.500">Image not available</Text>
              </Box>
            }
          />
        </AspectRatio>

        <Box p={4}>
          <Heading as="h3" size="md" mb={2} noOfLines={1}>
            {product.name}
          </Heading>

          <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
            ${product.price}
          </Text>

          <HStack spacing={2} justify="space-between">
            <Button 
              leftIcon={<EditIcon />} 
              onClick={onOpen} 
              colorScheme="blue" 
              size="sm"
              variant="outline"
            >
              Edit
            </Button>
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => handleDeleteProduct(product._id)}
              colorScheme="red"
              size="sm"
              aria-label="Delete product"
            />
          </HStack>
        </Box>
      </Box>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        initialFocusRef={initialRef}
        isCentered
        size="xl"
        motionPreset="scale"
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg={modalBg}>
          <ModalHeader borderBottom="1px" borderColor={borderColor}>
            <Flex align="center">
              <EditIcon mr={2} />
              Update Product
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={4}>
              {showImageAlert && (
                <Alert status="warning" variant="left-accent" mb={4}>
                  <AlertIcon />
                  <Box flex="1">
                    <AlertTitle>Image URL Warning</AlertTitle>
                    <AlertDescription fontSize="sm">
                      The URL may not be valid or the image might not load correctly.
                    </AlertDescription>
                  </Box>
                  <CloseButton 
                    position="absolute" 
                    right="8px" 
                    top="8px" 
                    onClick={() => setShowImageAlert(false)}
                  />
                </Alert>
              )}
              
              <FormControl isInvalid={errors.name}>
                <FormLabel fontWeight="semibold">Product Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              
              <FormControl isInvalid={errors.price}>
                <FormLabel fontWeight="semibold">Price ($)</FormLabel>
                <Input
                  placeholder="Price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={updatedProduct.price}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                />
                <FormErrorMessage>{errors.price}</FormErrorMessage>
              </FormControl>
              
              <FormControl isInvalid={errors.image}>
                <FormLabel fontWeight="semibold">Image URL</FormLabel>
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                />
                <FormErrorMessage>{errors.image}</FormErrorMessage>
              </FormControl>
              
              <FormControl>
                <FormLabel fontWeight="semibold">Category</FormLabel>
                <Select 
                  placeholder="Select category"
                  value={updatedProduct.category || ""}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="books">Books</option>
                  <option value="sports">Sports & Outdoors</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel fontWeight="semibold">Description</FormLabel>
                <Textarea
                  placeholder="Product description"
                  name="description"
                  value={updatedProduct.description || ""}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                  rows={3}
                />
              </FormControl>
              
              <Box w="full" mt={4}>
                <Text fontWeight="semibold" mb={2}>Image Preview</Text>
                <AspectRatio ratio={16/9} maxH="200px">
                  <Image 
                    src={updatedProduct.image} 
                    alt="Preview" 
                    objectFit="contain"
                    border="1px"
                    borderColor={borderColor}
                    rounded="md"
                    fallback={
                      <Box bg="gray.100" display="flex" alignItems="center" justifyContent="center" rounded="md">
                        <Text color="gray.500">Enter a URL to see preview</Text>
                      </Box>
                    }
                  />
                </AspectRatio>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter borderTop="1px" borderColor={borderColor}>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              isLoading={isSubmitting}
              loadingText="Updating"
            >
              Update Product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;