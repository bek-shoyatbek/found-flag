import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
  ActivityIndicator,
  Image,
} from "react-native";
import { Difficulty, GameMode } from "../types";
import { getCountyData } from "../constants/countries-with-code";
import { styles } from "../styles/FlagGame";
import LottieView from "lottie-react-native";

interface FlagGameProps {
  route: {
    params: {
      difficulty: Difficulty;
      mode: GameMode;
    };
  };
}

const getFlagUrl = (countryCode: string): string =>
  `https://flagsapi.com/${countryCode}/shiny/64.png`;

interface FlagGameProps {
  difficulty: string;
  mode: string;
}

const getDifficultySettings = (diff: Difficulty) => {
  switch (diff) {
    case "Easy":
      return { timeLimit: 60, countryCount: 10 };
    case "Medium":
      return { timeLimit: 45, countryCount: 15 };
    case "Hard":
      return { timeLimit: 30, countryCount: 20 };
    default:
      return { timeLimit: 60, countryCount: 10 };
  }
};

export default function FlagGame({ route }: FlagGameProps) {
  const { difficulty, mode } = route.params;
  const countriesData = getCountyData();

  const [countries, _] = useState(countriesData);
  const [loading, setLoading] = useState<boolean>(false);
  const [targetCountry, setTargetCountry] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const { timeLimit, countryCount } = useMemo(
    () => getDifficultySettings(difficulty),
    [difficulty]
  );

  const [remainingTime, setRemainingTime] = useState<number>(timeLimit);

  const countryCodes = useMemo(() => Object.keys(countries), [countries]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && remainingTime > 0) {
      interval = setInterval(() => setRemainingTime((prev) => prev - 1), 1000);
    } else if (remainingTime === 0) {
      endGame();
    }
    return () => clearInterval(interval);
  }, [gameStarted, remainingTime]);

  const endGame = useCallback(() => {
    setGameStarted(false);
    Alert.alert("Game Over", `Your score: ${score}`);
  }, [score]);

  const selectNewQuestion = useCallback(() => {
    if (countryCodes.length < 4) {
      console.error("Not enough countries to create a question");
      Alert.alert(
        "Error",
        "Not enough countries to create a question. Please restart the game."
      );
      endGame();
      return;
    }

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const newTarget =
      countryCodes[Math.floor(Math.random() * countryCodes.length)];

    const newOptions = new Set<string>([newTarget]);
    let attempts = 0;
    const maxAttempts = countryCodes.length * 2;

    while (newOptions.size < 4 && attempts < maxAttempts) {
      const randomCountry =
        countryCodes[Math.floor(Math.random() * countryCodes.length)];
      newOptions.add(randomCountry);
      attempts++;
    }

    if (newOptions.size < 4) {
      console.error("Failed to generate enough unique options");
      Alert.alert("Error", "Failed to generate question. Please try again.");
      return;
    }

    setTargetCountry(newTarget);
    setOptions(Array.from(newOptions).sort(() => Math.random() - 0.5));

    console.log("New question set successfully");
  }, [countryCodes, fadeAnim, endGame]);

  const startGame = useCallback(() => {
    console.log("Starting game...");
    setGameStarted(true);
    setScore(0);
    setRemainingTime(timeLimit);
    console.log("Game settings initialized");
    selectNewQuestion();
  }, [timeLimit, selectNewQuestion]);

  const handleAnswer = useCallback(
    (selectedCountry: string) => {
      if (selectedCountry === targetCountry) {
        setScore((prevScore) => prevScore + 1);
        selectNewQuestion();
      } else {
        Alert.alert("Wrong answer", "Try again!");
      }
    },
    [targetCountry, selectNewQuestion]
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading countries...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!gameStarted ? (
        <TouchableOpacity onPress={startGame}>
          <LottieView
            autoPlay
            style={styles.startAnimation}
            loop
            source={require("../assets/animations/start.json")}
          />
        </TouchableOpacity>
      ) : (
        <Animated.View style={{ ...styles.gameContainer, opacity: fadeAnim }}>
          <Text style={styles.targetFlag}>
            {mode === "Find Flag by Name"
              ? `Find the flag of: ${countries[targetCountry]}`
              : "Find the name of this flag:"}
          </Text>
          {mode === "Find Name by Flag" && (
            <Image
              source={{ uri: getFlagUrl(targetCountry) }}
              style={styles.targetFlagImage}
            />
          )}
          <Text style={styles.score}>Score: {score}</Text>
          <Text style={styles.timer}>Time: {remainingTime}s</Text>
          <View style={styles.optionsContainer}>
            {options.map((countryCode, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(countryCode)}
              >
                {mode === "Find Flag by Name" ? (
                  <Image
                    source={{ uri: getFlagUrl(countryCode) }}
                    style={styles.flagImage}
                  />
                ) : (
                  <Text style={styles.countryName}>
                    {countries[countryCode]}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      )}
    </ScrollView>
  );
}
