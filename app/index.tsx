import { Stack, useRouter } from "expo-router";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      alert('Please enter both username and password');
      return;
    }

    router.push({ pathname: "/home", params: { username } });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />

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

      <Button title="Login" onPress={handleLogin} />
      <View style={{ height: 10 }} />
      <Button title="Register" onPress={() => router.push("/register")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20 },
});