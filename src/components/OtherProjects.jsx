import {
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Badge,
  Center,
} from "@chakra-ui/react";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import { Link } from 'react-router-dom';
import OtherProjectsArray from "./OtherProjectsArray";
import TagsArray from "./TagsArray";

export default function Projects({ color }) {
    const others = OtherProjectsArray();
    const options = TagsArray("ProjectsTags");
    
    const [selected, setSelected] = useState("All");

    const handleSelected = (value) => {
      setSelected(value);
    };


    return (
      <>
        <Container maxW={"3xl"} id="projects">
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 14 }}
            pb={{ base: 20, md: 36 }}
          >
            <Text color={"gray.600"} fontSize={"xl"} px={4}>
              Other Projects
            </Text>
            <Center px={4}>
              <ButtonGroup variant="outline">
                <Button
                  colorScheme={selected === "All" ? `${color}` : "gray"}
                  onClick={() => handleSelected("All")}
                >
                  All
                </Button>
                {options.map((option) => (
                  <Button
                    key={option.value}
                    colorScheme={selected === option.value ? `${color}` : "gray"}
                    onClick={() => handleSelected(option.value)}
                  >
                    {option.value}
                  </Button>
                ))}
              </ButtonGroup>
            </Center>
            <SimpleGrid columns={[1, 2, 3]} px={4} spacing={4}>
              {others
                .filter((other) => {
                  if (selected === "All") {
                    return true;
                  } else {
                    return other.tags.some((tag) => tag.trim() === selected.trim());
                  }
                })
                .map((other) => (
                  <Fade bottom key={other.name}>
                    <Card >
                      <Stack>
                        <CardBody align="left" h={[null, "40vh"]}>
                          <Heading size="sm">{other.name}</Heading>
  
                          <Text fontSize="sm" py={2}>
                            {other.description}
                          </Text>
  
                          <HStack spacing={2}>
                            {other.buttons.map((button) => (
                              <Link
                                key={button.text}
                                href={button.href}
                                color={`${color}.400`}
                              >
                                {button.text}
                              </Link>
                            ))}
                          </HStack>
                          <HStack flexWrap="wrap" pt={4} spacing={2}>
                            {other.badges.map((badge) => (
                              <Badge
                                my={2}
                                key={badge.text}
                                colorScheme={badge.colorScheme}
                              >
                                {badge.text}
                              </Badge>
                            ))}
                          </HStack>
                        </CardBody>
                      </Stack>
                    </Card>
                  </Fade>
                ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </>
    );
  }
  