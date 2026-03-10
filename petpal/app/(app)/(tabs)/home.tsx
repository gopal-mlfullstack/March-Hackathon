import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuthStore } from "../../../src/store/authStore";

export default function Home() {
  const { user, logout } = useAuthStore();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Welcome back, {user?.name || "Pet Parent"}! 🐾
      </Text>
      <Text style={styles.subtitle}>
        Your pets are waiting for their daily care
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Next Reminder</Text>
        <Text style={styles.cardContent}>
          Vaccination for Bruno - in 3 days
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout (for testing)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 24,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF8C42",
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 16,
    color: "#444",
  },
  logoutButton: {
    marginTop: 40,
    alignSelf: "center",
    padding: 12,
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
  },
});
