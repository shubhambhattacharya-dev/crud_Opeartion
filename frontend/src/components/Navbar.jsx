import { 
  Container, 
  Flex, 
  Text, 
  HStack, 
  Button, 
  Link as ChakraLink, 
  useColorMode, 
  useColorModeValue, 
  Box 
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const SwitchIcon = colorMode === "light" ? IoMoon : LuSun;
  const textColor = useColorModeValue("gray.600", "gray.300");
  const hoverColor = useColorModeValue("blue.500", "blue.200");
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <>
      {/* Navbar */}
      <Box
        as="nav"
        bg={bgColor}
        boxShadow="sm"
        py={1}                      // 👈 reduced padding
        position="fixed"
        top="0"
        left="0"
        w="100%"
        zIndex="1000"
        backdropFilter="blur(8px)"
        bgOpacity="0.9"
      >
        <Container maxW="1140px" px={4}>
          <Flex
            h={12}                   // 👈 reduced height
            alignItems="center"
            justifyContent="space-between"
            flexDir={{ base: "column", sm: "row" }}
            gap={{ base: 2, sm: 0 }}
          >
            <ChakraLink 
              as={RouterLink} 
              to="/"
              _hover={{ textDecoration: "none" }}
            >
              <Text
                fontSize={{ base: "xl", sm: "2xl" }}
                fontWeight="bold"
                textTransform="uppercase"
                bgGradient="linear(to-r, cyan.400, blue.500)"
                bgClip="text"
                _hover={{
                  bgGradient: "linear(to-r, cyan.500, blue.600)"
                }}
                transition="all 0.2s"
              >
                Store 🛒
              </Text>
            </ChakraLink>

            <HStack spacing={3}>
              <ChakraLink 
                as={RouterLink} 
                to="/create"
                _hover={{ textDecoration: "none" }}
              >
                <Button 
                  aria-label="Add product"
                  colorScheme="blue"
                  variant="outline"
                  leftIcon={<MdOutlineAddShoppingCart />}
                  size="sm"
                >
                  Create
                </Button>
              </ChakraLink>

              <Button
                onClick={toggleColorMode}
                aria-label="Toggle color mode"
                variant="ghost"
                color={textColor}
                _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                size="sm"
              >
                <SwitchIcon size={18} />
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Spacer to push page content below navbar */}
      <Box h="60px" />   {/* 👈 adjust based on actual navbar height */}
    </>
  );
};

export default Navbar;
