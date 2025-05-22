import { Pressable, StyleSheet, Text, ToastAndroid, useColorScheme } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useBooks } from '../../../hooks/useBooks';
import { useEffect, useState } from 'react';

import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import ThemedCard from "../../../components/ThemedCard";
import ThemedButton from "../../../components/ThemedButton";
import Spacer from '../../../components/Spacer';
import { Colors } from '../../../constants/Colors';
import { View, ScrollView, Image } from 'react-native';
import BookStatusSelector from '../../../components/BookStatusSelector';


const BookDetails = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    const [book, setBook] = useState(null);
    
    const { id } = useLocalSearchParams();
    const { fetchBookById, deleteBook, updateBook } = useBooks();
    const router = useRouter();

    const handleDelete = async () => {
        await deleteBook(id);
        setBook(null);
        ToastAndroid.show('Book Deleted', ToastAndroid.SHORT);
        router.replace('/profile');
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
        )
    }

    function stripHtml(html) {
        return html
            .replace(/<[^>]+>/g, '')
            .replace(/(?<!\.)\.(?!\.)(\s*)/g, '.\n\n');
    }

  return (
    <ThemedView safe={true} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <ThemedCard style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: book.image || 'https://via.placeholder.com/150x220?text=No+Image',
                        }}
                        style={ styles.image }
                    />
                </View>
                <ThemedText style={[styles.title, {textAlign:"center"} ]}>{book.title ?? 'Unknown Title'}</ThemedText>
                <ThemedText style={{ textAlign:"center" }}>Written by {book.authors?.length() > 0 ? book.authors : 'Unknown Author'}</ThemedText>
                <Spacer />

                <ThemedText title={true} style={{ fontSize: 17, textAlign: "center" }}>Book description:</ThemedText>
                <Spacer height={10} />

                <ThemedText style={{ fontSize: 16, textAlign: "justify" }}>{stripHtml(book.description) ?? 'No description available.'}</ThemedText>

                <Spacer height={40} />
                
                <Pressable onPress={() => {
                    createBook({
                        title,
                        author: book.authors,
                        description: stripHtml(book.description),
                        image: book.image,
                    });
                    
                    router.replace('/wishlist');
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
                    <BookStatusSelector
                        key={book.$id}
                        status={book?.Status}
                        onChange={(newStatus) => {
                            updateBook(id, { Status: newStatus });
                            ToastAndroid.show('Book Updated', ToastAndroid.SHORT);
                            router.replace('/profile');
                        }}
                    />

                    <Spacer width={10} />
                </View>

                </Pressable>
            </ThemedCard>
                
            <ThemedButton style={styles.delete} onPress={handleDelete}>
                <Text style={{ color: '#fff', textAlign: 'center'}}>
                    Delete Book
                </Text>
            </ThemedButton>

            <Spacer height={40} />
        </ScrollView>
    </ThemedView>
  )
}

export default BookDetails

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
    delete: {
        marginTop: 40,
        backgroundColor: Colors.warning,
        width: 200,
        alignSelf: 'center',
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
    circle: {
        width: 50,
        height: 50,
        borderRadius: 90,
        justifyContent: "center",
        alignItems: "center",
    },
})