import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!username.trim() || !password.trim()) {
      alert('Please enter both username and password');
      return;
    }

    router.push({ pathname: "/home", params: { username } });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Register' }} />

      <Text style={styles.title}>Register Screen</Text>

      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      
      <Button title="Register" onPress={handleRegister} />

      <View style={styles.separator} />

      <Text style={styles.label}>Already have an account? </Text>

      <Button title="Back to Login" onPress={() => router.push("/")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20 },
  separator: { height: 1, backgroundColor: "#ccc", marginVertical: 20 },
});