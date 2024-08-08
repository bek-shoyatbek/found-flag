import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Difficulty } from "../../types";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomeTab"
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const animation = useRef<LottieView>(null);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={styles.animationContainer}
        source={require("../../assets/animations/globus.json")}
      />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Level</Text>
        {difficulties.map((difficulty, index) => (
          <Link
            href={{
              pathname: "/game",
              params: { difficulty, mode: "Find Flag by Name" },
            }}
            key={index}
            asChild
            style={styles.button}
            accessibilityRole={"button"}
          >
            <TouchableOpacity key={index} style={styles.button}>
              <Text style={styles.buttonText}>{difficulty}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
