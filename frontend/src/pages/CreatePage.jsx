import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  Text,
  Flex,
  Image,
  useToast,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { useProductStore } from "../store/Product.js"

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const createProduct = useProductStore((state) => state.createProduct);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!newProduct.name.trim()) newErrors.name = "Product name is required";
    if (!newProduct.price) newErrors.price = "Price is required";
    else if (parseFloat(newProduct.price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!newProduct.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) return;

    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast({
        title: "Product created",
        description: message || "Product added successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setNewProduct({ name: "", price: "", image: "" });
      setErrors({});
    } else {
      toast({
        title: "Error",
        description: message || "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box minH="100vh" bg={bgColor} py={10} px={4}>
      <Container maxW="container.xl">
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          mb={8}
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
        >
          Create New Product
        </Heading>

        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          {/* Form */}
          <Box flex="1" bg={cardBg} p={6} rounded="lg" shadow="md">
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              {errors.name && <Text color="red.500">{errors.name}</Text>}

              <Input
                placeholder="Price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              {errors.price && <Text color="red.500">{errors.price}</Text>}

              <Input
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
              {errors.image && <Text color="red.500">{errors.image}</Text>}

              <Button colorScheme="blue" w="full" onClick={handleAddProduct}>
                Add Product
              </Button>
            </VStack>
          </Box>

          {/* Product Preview */}
          <Box flex="1" bg={cardBg} p={6} rounded="lg" shadow="md">
            <Heading as="h3" size="md" mb={4}>
              Product Preview
            </Heading>
            <Divider mb={4} />
            {newProduct.image ? (
              <Image
                src={newProduct.image}
                alt="Product preview"
                borderRadius="lg"
                mb={4}
                maxH="200px"
                objectFit="contain"
                w="full"
              />
            ) : (
              <Box
                bg={bgColor}
                borderRadius="lg"
                height="200px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={4}
                border="2px dashed"
                borderColor={borderColor}
              >
                <Text color="gray.500">Image preview will appear here</Text>
              </Box>
            )}
            <VStack align="start" spacing={2}>
              <Text fontSize="xl" fontWeight="bold">
                {newProduct.name || "Product Name"}
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="green.500">
                {newProduct.price
                  ? `$${parseFloat(newProduct.price).toFixed(2)}`
                  : "$0.00"}
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default CreatePage;
