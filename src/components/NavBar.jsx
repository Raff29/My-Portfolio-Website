import {
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
  useMediaQuery,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import ProfileArray from "./ProfileArray";
const TbIcons = require("react-icons/tb");

export default function Nav({ color }) {
  const profile = ProfileArray();
  const colors = {
    blue: "#3182CE",
    cyan: "#00B5D8",
    gray: "#718096",
    green: "#38A169",
    orange: "#DD6B20",
    pink: "#D53F8C",
    purple: "#805AD5",
    red: "#E53E3E",
    teal: "#319795",
    yellow: "#D69E2E",
  };
  const [scroll, setScroll] = useState(false);
  const [sectionToScrollTo, setSectionToScrollTo] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  useEffect(() => {
    if (sectionToScrollTo) {
      setTimeout(() => {
        const section = document.querySelector(sectionToScrollTo);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
        setSectionToScrollTo(null);
      }, 100);
    }
  }, [sectionToScrollTo]);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setSectionToScrollTo(sectionId);
    } else {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);

  window.addEventListener("scroll", changeScroll);

  const TbLetterComponents = [];

  for (let i = 0; i < profile.logo.length; i++) {
    const letter = profile.logo[i];
    const component = TbIcons[`TbLetter${letter}`];
    TbLetterComponents.push(component);
  }

  return (
    <>
      <Flex
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        h={16}
        boxShadow={scroll ? "base" : "none"}
        zIndex="sticky"
        position="fixed"
        as="header"
        alignItems={"center"}
        justifyContent={"space-between"}
        w="100%"
      >
        <Link to="/" onClick={() => scrollToSection("#hero")}>
          <HStack>
            {TbLetterComponents.map((Component, index) => (
              <Component key={index} color={colors[color]} />
            ))}
          </HStack>
        </Link>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            {isLargerThanMD ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("#about")}
                >
                  About
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("#experience")}
                >
                  Experience
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("#projects")}
                >
                  Projects
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("#contact")}
                >
                  Contact
                </Button>
              </>
            ) : (
              <></>
            )}
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {isLargerThanMD ? (
              <></>
            ) : (
              <>
                <Button
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  onClick={onOpen}
                ></Button>
                <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerBody>
                      <Button
                        variant="ghost"
                        onClick={() => scrollToSection("#about")}
                      >
                        About
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => scrollToSection("#experience")}
                      >
                        Experience
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => scrollToSection("#projects")}
                      >
                        Projects
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => scrollToSection("#contact")}
                      >
                        Contact
                      </Button>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
