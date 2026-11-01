import { useState } from "react";
import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GooeySearch } from "@/components/gooey-search";
import { FolderIcon } from "@/components/folder-icon";

const COLLECTIONS = [
  { name: "Development", fileCount: 9, color: "#60d372" },
  { name: "Reading", fileCount: 1, color: "#6b9cf0" },
  { name: "Research", fileCount: 24, color: "#bc87e9" },
];

export default function Index() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [collectionIndex, setCollectionIndex] = useState(0);
  const { width } = useWindowDimensions();
  const collection = COLLECTIONS[collectionIndex];

  return (
    <SafeAreaView style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heading}>
            <Text style={styles.eyebrow}>COMPONENT PREVIEW</Text>
            <Text style={styles.title}>Search & collections</Text>
            <Text style={styles.description}>Try your mobile components.</Text>
          </View>

          <Link href="./material-ui-demo" asChild>
            <Pressable accessibilityRole="link" style={styles.materialLink}>
              <View style={{ flex: 1, gap: 5 }}>
                <Text style={styles.materialLinkTitle}>Material UI component lab</Text>
                <Text style={styles.materialLinkDescription}>Explore Android components · light & dark previews</Text>
              </View>
              <Text style={styles.materialLinkArrow}>→</Text>
            </Pressable>
          </Link>

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

          <View style={styles.collectionSection}>
            <Text style={styles.sectionTitle}>Collections</Text>
            <View style={styles.collectionPicker}>
              {COLLECTIONS.map((item, index) => (
                <Pressable
                  key={item.name}
                  accessibilityRole="button"
                  accessibilityState={{ selected: collectionIndex === index }}
                  onPress={() => setCollectionIndex(index)}
                  style={[
                    styles.collectionOption,
                    collectionIndex === index && styles.selectedOption,
                  ]}
                >
                  <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                  <Text style={styles.optionLabel}>{item.name}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.folderPreview}>
              <FolderIcon {...collection} width={Math.min(310, width - 80)} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#090909" },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  heading: { gap: 10 },
  eyebrow: { color: "#787878", fontSize: 11, fontWeight: "600", letterSpacing: 2 },
  title: { color: "#fafafa", fontSize: 32, fontWeight: "600", letterSpacing: -1 },
  description: { color: "#939393", fontSize: 15, lineHeight: 22 },
  materialLink: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: "#191525", borderColor: "#463567", borderWidth: 1,
    borderRadius: 20, padding: 20, marginTop: 24,
  },
  materialLinkTitle: { color: "#e7dcff", fontSize: 17, fontWeight: "600" },
  materialLinkDescription: { color: "#b8aaca", fontSize: 13, lineHeight: 20 },
  materialLinkArrow: { color: "#c9b8ff", fontSize: 26 },
  preview: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: { minHeight: 76, alignItems: "center", gap: 14 },
  hint: { color: "#787878", fontSize: 13, lineHeight: 21, textAlign: "center" },
  submission: { color: "#d4d4d4", fontSize: 14, textAlign: "center" },
  collectionSection: { gap: 20, marginTop: 24 },
  sectionTitle: { color: "#fafafa", fontSize: 22, fontWeight: "600" },
  collectionPicker: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  collectionOption: {
    flexDirection: "row", alignItems: "center", gap: 7,
    paddingHorizontal: 12, paddingVertical: 12,
    borderRadius: 24, borderWidth: 1, borderColor: "#292929",
  },
  selectedOption: { backgroundColor: "#242424", borderColor: "#575757" },
  colorDot: { width: 8, height: 8, borderRadius: 4 },
  optionLabel: { color: "#e5e5e5", fontSize: 12 },
  folderPreview: {
    backgroundColor: "#ffffff", borderRadius: 24,
    paddingHorizontal: 16, paddingTop: 24, paddingBottom: 44,
    alignItems: "center",
  },
});
