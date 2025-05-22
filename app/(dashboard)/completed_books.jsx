import { StyleSheet, FlatList, Pressable, View, Image } from 'react-native';
import { useBooks } from '../../hooks/useBooks';
import { Colors } from '../../constants/Colors';

import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import ThemedCard from "../../components/ThemedCard";
import { useRouter } from 'expo-router';

const Books = () => {
  const { books } = useBooks();
  const router = useRouter();

return (
  <ThemedView style={styles.container} safe={true}>
    <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Completed Books
      </ThemedText>
    <Spacer />

    {
      books.filter((book) => book.Status?.toLowerCase() === 'completed').length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Spacer height={100} />
          <ThemedText style={{ textAlign: "center" }}>
            You have no completed books.
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={books.filter((book) => book.Status?.toLowerCase() === 'completed')}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/books/${item.$id}`)}>
              <ThemedCard style={styles.card}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  
                  <Image
                    source={{
                      uri: item.image || 'https://via.placeholder.com/60x90?text=No+Image',
                    }}
                    style={styles.image}
                  />

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <ThemedText style={styles.title}>{item.title}</ThemedText>
                    <ThemedText>Written by {item.author}</ThemedText>
                  </View>

                </View>
              </ThemedCard>
          </Pressable>
          )}
        />
      )
    }

  </ThemedView>
);
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    marginTop: 40,
    paddingBottom: 40,
  },
  card: {
      width: "90%",
      marginHorizontal: "5%",
      marginVertical: 10,
      padding: 10,
      paddingLeft: 14,
      borderLeftColor: Colors.primary,
      borderLeftWidth: 4,
  },
  title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
  },
  image: {
    width: 60,
    height: 90,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
});
