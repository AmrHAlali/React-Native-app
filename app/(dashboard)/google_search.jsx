import {
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
    Pressable,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../components/ThemedView';
import ThemedTextInput from '../../components/ThemedTextInput';
import { useState } from 'react';
import { useGoogleBooks } from '../../hooks/useGoogleBooks';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';import { useBooks } from '../../hooks/useBooks';
import ThemedCard from "../../components/ThemedCard";

export const GoogleSearch = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    const [query, setQuery] = useState('');
    const { books, searchBooks } = useGoogleBooks();

    const handleSearch = async () => {
        if (!query.trim()) return;
        await searchBooks(query);
    };

    const renderItem = ({ item }) => (
    <Pressable onPress={() => router.push(`/google_books/${item.id}`)}>
        <ThemedCard style={[styles.card, { backgroundColor: theme.uiBackground }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
            source={{
                uri:
                item.volumeInfo?.imageLinks?.thumbnail ||
                'https://via.placeholder.com/60x90?text=No+Image',
            }}
            style={styles.image}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.title, { color: theme.text }]}>
                {item.volumeInfo?.title ?? 'Unknown Title'}
            </Text>
            <Text style={styles.author}>
                {item.volumeInfo?.authors?.join(', ') ?? 'Unknown Author'}
            </Text>
            </View>
        </View>
        </ThemedCard>
    </Pressable>
    );


    return (
        <ThemedView style={styles.container}>
            <View style={[styles.searchWrapper, { backgroundColor: theme.uiBackground }]}>
                <ThemedTextInput
                    style={styles.input}
                    placeholder="Search for a book"
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                />
                <TouchableOpacity onPress={handleSearch} style={styles.iconButton}>
                    <Ionicons name="search" size={20} color="#666" />
                </TouchableOpacity>
            </View>

            if(books.length === 0) {
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Spacer height={100} />
                <ThemedText style={{ textAlign: "center", marginHorizontal: 50 }}>
                    No results found. Please try a different search term.
                </ThemedText>
                </View>
            }

            else
            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingBottom: 20,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.text,
        marginHorizontal: 20,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        paddingRight: 8,
    },
    iconButton: {
        padding: 8,
    },
    list: {
        paddingHorizontal: 20,
    },
    resultItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    author: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    card: {
        width: '100%',
        marginVertical: 8,
        padding: 10,
        paddingLeft: 14,
        borderLeftColor: Colors.primary,
        borderLeftWidth: 4,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    image: {
        width: 60,
        height: 90,
        borderRadius: 6,
        backgroundColor: '#ddd',
    },

});

export default GoogleSearch;
