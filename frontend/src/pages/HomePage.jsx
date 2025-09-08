import { 
  Container, 
  SimpleGrid, 
  Text, 
  VStack, 
  Box, 
  Heading,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  IconButton,
  useColorModeValue,
  Badge,
  HStack,
  ScaleFade,
  SlideFade,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/Product.js";
import ProductCard from "../components/ProductCard";
import { SearchIcon, AddIcon, ViewIcon, SettingsIcon } from "@chakra-ui/icons";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { isOpen: isAlertOpen, onClose: onAlertClose, onOpen: onAlertOpen } = useDisclosure({ defaultIsOpen: true });

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let result = products;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(product => 
        product.category === categoryFilter
      );
    }
    
    // Apply sorting
    result = [...result].sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "price-low") {
        return a.price - b.price;
      } else if (sortOption === "price-high") {
        return b.price - a.price;
      } else if (sortOption === "newest") {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      return 0;
    });
    
    setFilteredProducts(result);
  }, [products, searchTerm, sortOption, categoryFilter]);

  // Get unique categories for filter
  const categories = ["all", ...new Set(products.map(product => product.category).filter(Boolean))];

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW='container.xl'>
        <VStack spacing={8} align="stretch">
          <SlideFade in={true} offsetY='20px'>
            <Box textAlign="center">
              <Heading
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="extrabold"
                mb={4}
                bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
                bgClip="text"
              >
                STORE
              </Heading>
              <Text fontSize={{ base: "lg", md: "xl" }} color={textColor} maxW="2xl" mx="auto">
              Enjoy The Little Things
              </Text>
            </Box>
          </SlideFade>

          {isAlertOpen && (
            <Alert status="info" variant="subtle" borderRadius="md" mb={2}>
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Welcome to our store!</AlertTitle>
                <AlertDescription fontSize="sm">
                  We've added new products this week. Check them out before they're gone!
                </AlertDescription>
              </Box>
              <CloseButton onClick={onAlertClose} />
            </Alert>
          )}

          <Box 
            bg={cardBg} 
            p={6} 
            borderRadius="lg" 
            boxShadow="base"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Flex 
              direction={{ base: "column", md: "row" }} 
              gap={4} 
              align={{ base: "stretch", md: "end" }}
            >
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              
              <Select 
                placeholder="Category" 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                maxW={{ base: "100%", md: "200px" }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </Select>
              
              <Select 
                placeholder="Sort by" 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                maxW={{ base: "100%", md: "200px" }}
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="newest">Newest First</option>
              </Select>
              
              <Button 
                as={Link} 
                to="/create" 
                colorScheme="blue" 
                leftIcon={<AddIcon />}
                flexShrink={0}
              >
                Add Product
              </Button>
            </Flex>
            
            <Flex mt={4} justify="space-between" align="center">
              <Text fontSize="sm" color={textColor}>
                Showing {filteredProducts.length} of {products.length} products
              </Text>
              
              {searchTerm && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setSearchTerm("")}
                >
                  Clear search
                </Button>
              )}
            </Flex>
          </Box>

          {filteredProducts.length > 0 ? (
            <>
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                  xl: "repeat(4, 1fr)"
                }}
                gap={6}
              >
                {filteredProducts.map((product, index) => (
                  <GridItem key={product._id}>
                    <ScaleFade in={true} delay={index * 0.1}>
                      <ProductCard product={product} />
                    </ScaleFade>
                  </GridItem>
                ))}
              </Grid>
              
              <Flex justify="center" mt={8}>
                <HStack spacing={4}>
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button colorScheme="blue" size="sm">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </HStack>
              </Flex>
            </>
          ) : (
            <Box 
              textAlign="center" 
              py={16} 
              bg={cardBg}
              borderRadius="lg"
              boxShadow="base"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Box fontSize="6xl" mb={4} opacity={0.5}>
                🛒
              </Box>
              <Heading as="h3" size="lg" mb={4} color={textColor}>
                {searchTerm || categoryFilter !== "all" ? "No products found" : "No products yet"}
              </Heading>
              <Text mb={6} color={textColor}>
                {searchTerm || categoryFilter !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "Be the first to add a product to our store!"
                }
              </Text>
              <Button 
                as={Link} 
                to="/create" 
                colorScheme="blue" 
                size="lg" 
                leftIcon={<AddIcon />}
              >
                Create a product
              </Button>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default HomePage;