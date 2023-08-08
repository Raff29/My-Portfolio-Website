import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={4} align="center">
        <Text>Made with ♥ in Nova Scotia © 2023 Raphael Pinto. </Text>
      </Container>
    </Box>
  );
};

export default Footer;
