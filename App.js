import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  Image,
  TextInput,
  View,
  FlatList,
} from "react-native";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const getResults = async (keyword) => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + keyword
      );
      const data = await response.json();
      setResults(data.meals);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.strMeal}</Text>
              <Image
                style={styles.picture}
                source={{ uri: item.strMealThumb }}
              />
            </View>
          )}
        />
      </View>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setKeyword(text)}
        />
        <Button title="Find" onPress={() => getResults(keyword)} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  list: {
    marginTop: 90,
    marginLeft: 10,
  },
  picture: {
    width: 50,
    height: 50,
  },
  search: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    paddingTop: 5,
    marginBottom: 50,
  },
  input: {
    width: 200,
    borderColor: "grey",
    borderWidth: 1,
  },
});
