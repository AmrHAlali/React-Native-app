
import { StyleSheet, useColorScheme, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spacer from './Spacer';
import ThemedText from './ThemedText';
import { useBooks } from '../hooks/useBooks';
import ThemedCard from './ThemedCard';
import { Colors } from '../constants/Colors';

const ThemedList = ({ style, iconName, text, status}) => {
    const { books } = useBooks();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <ThemedCard style = {[styles.card, style]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name={iconName} size={35} color={theme.iconColor} />

                <Spacer width={10}/>

                <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
                    {text}
                </ThemedText>

                <Spacer width={10}/>

                <ThemedText title={true} style={[styles.heading, { color: Colors.primary }]}>
                    {books.filter(book => book.Status === (status === 1 ? "Completed" : "Wish List")).length}
                </ThemedText>
            </View>
        </ThemedCard>
    )
}

export default ThemedList

const styles = StyleSheet.create({
    card: {
        marginHorizontal: "5%",
        marginVertical: 10,
        padding: 50,
        paddingLeft: 14,
        borderColor: Colors.primary,
        borderWidth: 4,
        borderRadius: 15,
    },
    heading: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
})
