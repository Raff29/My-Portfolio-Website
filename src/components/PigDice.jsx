import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

const PigDice = () => {
  const [gameState, setGameState] = useState({
    scores: [0, 0],
    roundScore: 0,
    activePlayer: 0,
    isPlaying: true,
    previousRoll: null,
    targetScore: 100,
    diceRoll: 1,
  });

  const rollDice = () => {
    if (gameState.isPlaying) {
      const diceRoll = Math.floor(Math.random() * 6) + 1;

      if (diceRoll === 6 && gameState.previousRoll === 6) {
        setGameState((prevState) => ({
          ...prevState,
          scores: [0, 0],
          roundScore: 0,
          previousRoll: null,
          activePlayer: 1 - prevState.activePlayer,
          diceRoll,
        }));
      } else if (diceRoll === 1) {
        setGameState((prevState) => ({
          ...prevState,
          roundScore: 0,
          previousRoll: diceRoll,
          activePlayer: 1 - prevState.activePlayer,
          diceRoll,
        }));
      } else {
        setGameState((prevState) => ({
          ...prevState,
          roundScore: prevState.roundScore + diceRoll,
          previousRoll: diceRoll,
          diceRoll,
        }));
      }
    }
  };

  const holdScore = () => {
    if (gameState.isPlaying) {
      const newScores = [...gameState.scores];
      newScores[gameState.activePlayer] += gameState.roundScore;
      if (newScores[gameState.activePlayer] >= gameState.targetScore) {
        setGameState((prevState) => ({
          ...prevState,
          scores: newScores,
          isPlaying: false,
        }));
      } else {
        setGameState((prevState) => ({
          ...prevState,
          scores: newScores,
          roundScore: 0,
          previousRoll: null,
          activePlayer: 1 - prevState.activePlayer,
        }));
      }
    }
  };

  const newGame = () => {
    setGameState({
      scores: [0, 0],
      roundScore: 0,
      activePlayer: 0,
      isPlaying: true,
      previousRoll: null,
      targetScore: gameState.targetScore,
    });
  };

  const changeTargetScore = (event) => {
    const newTargetScore = parseInt(event.target.value);
    setGameState((prevState) => ({
      ...prevState,
      targetScore: newTargetScore,
    }));
  };

  const winner = gameState.scores.findIndex(
    (score) => score >= gameState.targetScore
  );

  return (
    <Box
      d="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      minW="100vw"
      bg={useColorModeValue("gray.200", "gray.900")}
    >
      <Container
        maxW="container.md"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="xl"
        p="6"
        rounded="md"
      >
        {gameState.isPlaying && winner !== -1 && (
          <Center mb="4">
            <Heading size="lg">Player {winner + 1} wins!</Heading>
          </Center>
        )}

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "4", md: "12" }}
          my="10rem"
          align="center"
          justify="center"
        >
          {/* Player 1 Section */}
          <PlayerSection
            player={0}
            gameState={gameState}
            setGameState={setGameState}
          />

          {/* Dice and Target Score Section */}
          <VStack spacing={8}>
            <InputGroup size="sm">
              <Input
                type="number"
                placeholder="Target Score"
                value={gameState.targetScore}
                onChange={changeTargetScore}
                disabled={!gameState.isPlaying}
                width="4rem"
              />
              <InputRightAddon children="Score" />
            </InputGroup>
            {gameState.isPlaying && gameState.diceRoll !== undefined && (
              <Box boxSize="100" shadow="dark-lg">
                <img
                  src={`./assets/PigDiceImages/dice-${gameState.diceRoll}.png`}
                  alt="Dice"
                />
              </Box>
            )}
          </VStack>

          {/* Player 2 Section */}
          <PlayerSection
            player={1}
            gameState={gameState}
            setGameState={setGameState}
          />
        </Stack>

        <Center mt="6">
          <Stack direction={{ base: "column", md: "row" }} spacing="4">
            <Button
              colorScheme="teal"
              onClick={rollDice}
              disabled={!gameState.isPlaying}
            >
              Roll dice
            </Button>
            <Button colorScheme="teal" onClick={newGame}>
              New game
            </Button>
            <Button
              colorScheme="teal"
              onClick={holdScore}
              disabled={!gameState.isPlaying}
            >
              Hold
            </Button>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
};

const PlayerSection = ({ player, gameState, setGameState }) => {
  return (
    <Box
      p="10"
      bg={useColorModeValue(
        gameState.activePlayer === player ? "gray.200" : "gray.300",
        gameState.activePlayer === player ? "gray.600" : "gray.700"
      )}
      rounded="md"
      shadow="lg"
    >
      <Center>
        <Heading size="lg">
          Player {player + 1}
          {gameState.activePlayer === player}
        </Heading>
        <ArrowDownIcon
          ml={2}
          boxSize="24px"
          color={
            gameState.activePlayer === player ? "green.500" : "transparent"
          }
        />
      </Center>

      <Center my="6">
        <Text fontSize="5xl">{gameState.scores[player]}</Text>
      </Center>

      <Box
        bg={useColorModeValue("teal.500", "teal.200")}
        p="2"
        rounded="md"
        shadow="md"
      >
        <Text fontSize="sm">Current</Text>
        <Center>
          <Text fontSize="2xl">
            {gameState.activePlayer === player ? gameState.roundScore : "-"}
          </Text>
        </Center>
      </Box>
    </Box>
  );
};

export default PigDice;
