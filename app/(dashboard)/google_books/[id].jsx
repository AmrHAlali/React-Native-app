import { Image, Pressable, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import ThemedCard from "../../../components/ThemedCard";
import Spacer from '../../../components/Spacer';
import { Colors } from '../../../constants/Colors';
import { useGoogleBooks } from '../../../hooks/useGoogleBooks';
import { useBooks } from '../../../hooks/useBooks';
import BookStatusSelector from '../../../components/BookStatusSelector';
import Toast from 'react-native-toast-message';

const GoogleBookDetails = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    const [book, setBook] = useState(null);
    const { books, createBook, updateBook } = useBooks();

    const { id } = useLocalSearchParams();
    const { fetchBookById } = useGoogleBooks();

    function stripHtml(html) {
        return html
            .replace(/<[^>]+>/g, '')
            .replace(/(?<!\.)\.(?!\.)(\s*)/g, '.\n\n');
    }

    useEffect(() => {
        async function loadBook() {
            const bookData = await fetchBookById(id);
            setBook(bookData);
        }

        loadBook();
    }, [id]);

    if (!book) {
        return (
            <ThemedView safe={true} style={styles.container}>
                <ThemedText>Loading...</ThemedText>
            </ThemedView>
        );
    }

    const { volumeInfo } = book;
    const title = volumeInfo?.title ?? 'Unknown Title';
    const authors = volumeInfo?.authors?.join(', ') ?? 'Unknown Author';
    const description = volumeInfo?.description ?? 'No description available.';
    const image = volumeInfo?.imageLinks?.thumbnail ?? 'https://via.placeholder.com/150x220?text=No+Image';

    return (
        <ThemedView safe={true} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedCard style={styles.card}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{
                                uri: image || 'https://via.placeholder.com/150x220?text=No+Image',
                            }}
                            style={ styles.image }
                        />
                    </View>
                    <ThemedText style={[styles.title, {textAlign:"center"} ]}>{title}</ThemedText>
                    <ThemedText style={{ textAlign:"center" }}>Written by {authors}</ThemedText>
                    <Spacer />

                    <ThemedText title={true} style={{ fontSize: 17, textAlign: "center" }}>Book description:</ThemedText>
                    <Spacer height={10} />

                    <ThemedText style={{ fontSize: 16, textAlign: "justify" }}>{stripHtml(description)}</ThemedText>

                    <Spacer height={40} />
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
                        <BookStatusSelector
                            key={book.$id}
                            status={book?.Status}
                            onChange={(newStatus) => {
                                if (books.find((b) => b.title === title)) {
                                    updateBook(books.find((b) => b.title === title).$id, { Status: newStatus });

                                    ToastAndroid.show('Book Updated', ToastAndroid.SHORT);
                                    return;
                                }
                                createBook({
                                    title: title,
                                    author: authors,
                                    description: description,
                                    image: image,
                                    Status: newStatus,
                                });
                                ToastAndroid.show('Book Added', ToastAndroid.SHORT);
                            }}
                        />

                        <Spacer width={10} />
                    </View>
                </ThemedCard>
            </ScrollView>
        </ThemedView>
    );
};

export default GoogleBookDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
    },
    title: {
        fontSize: 22,
        marginVertical: 10,
    },
    card: {
        margin: 20,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 90,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: 150+70,
        height: 220+70,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f4f4f4',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
