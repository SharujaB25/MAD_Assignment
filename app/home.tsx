import { useClickCount } from "@/context/ClickCountProvider";
import { Stack, useLocalSearchParams  } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image, ActivityIndicator, FlatList } from "react-native";

export default function Home() {
  const { username } = useLocalSearchParams();
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { count, increment } = useClickCount();

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        setMemes(data.data.memes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching memes:", error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card} onTouchEnd={increment}>
      <Image source={{ uri: item.url }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.status}>Captions: {item.captions}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Welcome, ' + username as string }} />

        <FlatList
            data={memes}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
        />
      
      <View style={styles.fab}>
        <Button
          title={count.toString()}
          onPress={() => {}}
          color="#2196F3"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  subtitle: { fontSize: 18 },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
  status: {
    fontSize: 14,
    color: "#555",
    padding: 10,
    paddingTop: 0,
  },
});