import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Center,
  Link,
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import ProfileArray from "./ProfileArray";
import ContactForm from "./ContactForm";

const pointerCursorStyle = { cursor: "pointer" };

export default function Contact({ color }) {
  const profile = ProfileArray();
  const linkedin = () => {
    window.open(`${profile.linkedin}`, "_blank", "noreferrer,noopener");
  };
  const github = () => {
    window.open(`${profile.github}`, "_blank", "noreferrer,noopener");
  };
  const email = () => {
    window.open(`mailto:${profile.email}`, "_blank", "noreferrer,noopener");
  };
  return (
    <>
      <Container maxW={"3xl"} id="contact">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                04
              </Text>
              <Text fontWeight={800}>Contact</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <ContactForm />
            <Text color={"gray.600"} fontSize={"xl"} px={4}>
              {profile.contact}
            </Text>
            <Text
              color={`${color}.500`}
              fontWeight={600}
              fontSize={"lg"}
              px={4}
            >
              <Link href={`mailto:${profile.email}`} isExternal>
                {profile.email}
              </Link>
            </Text>
            <Center>
              <HStack pt={4} spacing={4}>
                <FaLinkedin
                  onClick={linkedin}
                  size={28}
                  style={pointerCursorStyle}
                />
                <FaGithub
                  onClick={github}
                  size={28}
                  style={pointerCursorStyle}
                />
                <FaEnvelope
                  onClick={email}
                  size={28}
                  style={pointerCursorStyle}
                />
              </HStack>
            </Center>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}