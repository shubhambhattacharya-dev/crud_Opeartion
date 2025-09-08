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

  return (
    <Box 
      as="nav" 
      bg={useColorModeValue("white", "gray.800")} 
      boxShadow="sm" 
      py={2}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-opacity-90" // 👈 Tailwind
    >
      <Container 
        maxW="1140px" 
        px={4} 
        className="mx-auto" // 👈 Tailwind
      >
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          flexDir={{ base: "column", sm: "row" }}
          gap={{ base: 3, sm: 0 }}
          className="transition-all duration-300" // 👈 Tailwind
        >
          <ChakraLink 
            as={RouterLink} 
            to="/"
            _hover={{ textDecoration: "none" }}
            className="hover:scale-105 transition-transform duration-200" // 👈 Tailwind
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
                className="hover:shadow-md hover:-translate-y-[1px] transition-all duration-200" // 👈 Tailwind
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
              className="hover:rotate-12 transition-transform duration-200" // 👈 Tailwind
            >
              <SwitchIcon size={18} />
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
