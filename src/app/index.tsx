import { useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GooeySearch } from "@/components/gooey-search";

export default function Index() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  return (
    <SafeAreaView style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>COMPONENT PREVIEW</Text>
          <Text style={styles.title}>Gooey search</Text>
          <Text style={styles.description}>A little motion. A simple search.</Text>
        </View>

        <View style={styles.preview}>
          <GooeySearch
            placeholder="Search..."
            value={query}
            onChangeText={setQuery}
            onSearch={setSubmittedQuery}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.hint}>
            Tap Search to expand.{"\n"}Tap the icon to collapse.
          </Text>
          {submittedQuery ? (
            <Text style={styles.submission}>Submitted: {submittedQuery}</Text>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#090909" },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  heading: { gap: 10 },
  eyebrow: { color: "#787878", fontSize: 11, fontWeight: "600", letterSpacing: 2 },
  title: { color: "#fafafa", fontSize: 32, fontWeight: "600", letterSpacing: -1 },
  description: { color: "#939393", fontSize: 15, lineHeight: 22 },
  preview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: { minHeight: 76, alignItems: "center", gap: 14 },
  hint: { color: "#787878", fontSize: 13, lineHeight: 21, textAlign: "center" },
  submission: { color: "#d4d4d4", fontSize: 14, textAlign: "center" },
});
