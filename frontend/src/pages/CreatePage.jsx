import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  VStack,
  Heading,
  Input,
  useColorModeValue,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Image,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Flex,
  Card,
  CardBody,
  Text,
  Divider
} from "@chakra-ui/react";
import { AddIcon, AttachmentIcon } from "@chakra-ui/icons";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    img: "",
    description: "",
    category: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const validateForm = () => {
    const newErrors = {};
    if (!newProduct.name.trim()) newErrors.name = "Product name is required";
    if (!newProduct.price) newErrors.price = "Price is required";
    if (newProduct.price && parseFloat(newProduct.price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!newProduct.img.trim()) newErrors.img = "Image URL is required";
    if (!newProduct.category.trim())
      newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log(newProduct);
        setIsSubmitting(false);
        toast({
          title: "Product Created",
          description: `${newProduct.name} has been successfully added.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
        setNewProduct({
          name: "",
          price: "",
          img: "",
          description: "",
          category: ""
        });
        setErrors({});
      }, 1500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      minH="100vh"
      overflowX="hidden"
      overflowY="auto"
      py={10}
      px={4}
      bg={bgColor}
    >
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" position="sticky" top={0} zIndex={1} bg={bgColor} py={2}>
            <Heading
              as="h1"
              size="xl"
              mb={2}
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              Create New Product
            </Heading>
            <Text color="gray.500">Add a new product to your inventory</Text>
          </Box>

          <Flex
            direction={{ base: "column", md: "row" }}
            gap={6}
            align="flex-start"
            w="full"
            flexWrap="wrap"
          >
            <Box flex="1 1 0" minW={{ base: "100%", md: "45%" }}>
              <Card
                bg={cardBg}
                boxShadow="xl"
                rounded="lg"
                overflow="hidden"
                border="1px"
                borderColor={borderColor}
              >
                <CardBody p={6}>
                  <VStack spacing={5}>
                    <FormControl isInvalid={errors.name}>
                      <FormLabel fontWeight="semibold">Product Name</FormLabel>
                      <Input
                        placeholder="Enter product name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        size="lg"
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.price}>
                      <FormLabel fontWeight="semibold">Price ($)</FormLabel>
                      <Input
                        placeholder="0.00"
                        name="price"
                        type="number"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        size="lg"
                      />
                      <FormErrorMessage>{errors.price}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.category}>
                      <FormLabel fontWeight="semibold">Category</FormLabel>
                      <Input
                        placeholder="e.g., Electronics, Clothing"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        size="lg"
                      />
                      <FormErrorMessage>{errors.category}</FormErrorMessage>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontWeight="semibold">
                        Description (Optional)
                      </FormLabel>
                      <Textarea
                        placeholder="Describe the product features and details..."
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        size="lg"
                        rows={3}
                      />
                    </FormControl>

                    <FormControl isInvalid={errors.img}>
                      <FormLabel fontWeight="semibold">Image URL</FormLabel>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        name="img"
                        value={newProduct.img}
                        onChange={handleInputChange}
                        size="lg"
                      />
                      <FormErrorMessage>{errors.img}</FormErrorMessage>
                    </FormControl>

                    <Button
                      colorScheme="blue"
                      onClick={handleAddProduct}
                      w="full"
                      size="lg"
                      isLoading={isSubmitting}
                      loadingText="Creating Product"
                      mt={4}
                      leftIcon={<AddIcon />}
                    >
                      Add Product
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </Box>

            <Box flex="1 1 0" minW={{ base: "100%", md: "45%" }}>
              <Card
                bg={cardBg}
                boxShadow="xl"
                rounded="lg"
                overflow="hidden"
                border="1px"
                borderColor={borderColor}
              >
                <CardBody p={6}>
                  <Heading
                    as="h3"
                    size="md"
                    mb={4}
                    display="flex"
                    alignItems="center"
                  >
                    <AttachmentIcon mr={2} /> Product Preview
                  </Heading>
                  <Divider mb={4} />
                  {newProduct.img ? (
                    <Image
                      src={newProduct.img}
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
                    {newProduct.category && (
                      <Text
                        fontSize="sm"
                        color="blue.500"
                        fontWeight="medium"
                      >
                        {newProduct.category}
                      </Text>
                    )}
                    <Text fontSize="lg" fontWeight="bold" color="green.500">
                      {newProduct.price
                        ? `$${parseFloat(newProduct.price).toFixed(2)}`
                        : "$0.00"}
                    </Text>
                    {newProduct.description && (
                      <>
                        <Divider mt={2} mb={1} />
                        <Text fontSize="sm" color="gray.600">
                          {newProduct.description}
                        </Text>
                      </>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            </Box>
          </Flex>

          <Alert status="info" variant="left-accent" borderRadius="md">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>Tips for adding products</AlertTitle>
              <AlertDescription fontSize="sm">
                Provide clear product images and accurate descriptions to improve
                customer experience.
              </AlertDescription>
            </Box>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        </VStack>
      </Container>
    </Box>
  );
};

export default CreatePage;
