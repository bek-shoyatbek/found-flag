import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { GameHistory } from "../../types";
import { useGlobalSearchParams, useNavigation } from "expo-router";

const gameHistory: GameHistory[] = [
  {
    id: "1",
    mode: "Find Flag by Name",
    difficulty: "Easy",
    score: 10,
    date: "2023-05-01",
  },
  {
    id: "2",
    mode: "Find Name by Flag",
    difficulty: "Medium",
    score: 8,
    date: "2023-05-02",
  },
];

export default function ProfileScreen() {
  const glob = useGlobalSearchParams();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game History</Text>
      <FlatList
        data={gameHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>Mode: {item.mode}</Text>
            <Text style={styles.historyText}>
              Difficulty: {item.difficulty}
            </Text>
            <Text style={styles.historyText}>Score: {item.score}</Text>
            <Text style={styles.historyText}>Date: {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  historyText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
