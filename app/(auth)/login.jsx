import { StyleSheet, Text } from 'react-native'
import { Link } from 'expo-router';
import { useState } from 'react';

// themed components
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import ThemedButton from '../../components/ThemedButton';
import ThemedTextInput from '../../components/ThemedTextInput';
import { useUser } from '../../hooks/useUser';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ThemedLogo from '../../components/ThemedLogo';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { login } = useUser();

    const handleSubmit = async () => {
        setError(null);
        try {
            await login(email, password)
        } catch (error) {
            setError(error.message)
        }
    }
    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style ={styles.container}>
            <ThemedLogo />
            <Spacer height={10}/>
            <ThemedText title={true} style = {styles.title}>
                Login to Your Account
            </ThemedText>

            <ThemedTextInput
                style = {{ width: '80%', marginBottom: 20 }}
                placeholder='Email'
                keyboardType='email-address'
                onChangeText={ setEmail }
                value={ email }
            />

            <ThemedTextInput
                style = {{ width: '80%', marginBottom: 20 }}
                placeholder='Password'
                keyboardType='Password'
                onChangeText={ setPassword }
                value={ password }
                secureTextEntry={ true }
            />

            {error && <Spacer height={10} /> && <Text style={styles.error}>{error}</Text>}
            {error && <Spacer height={10} />}

            <ThemedButton
                onPress={ handleSubmit }
            >
                <Text style={ styles.buttonText }>Login</Text>
            </ThemedButton>

            <Spacer height={20} />
            <Link href="/register">
                <ThemedText style={{ textAlign: 'center' }}>
                    Register instead
                </ThemedText>
            </Link>
            <Spacer height={100}/>

        </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 30,
    },
    pressed: {
        opacity: 0.75,
    },
    error: {
        color: Colors.warning,
        padding: 10,
        backgroundColor: '#f5c1c8',
        borderColor: Colors.warninig,
        borderWidth: 1,
        borderRadius: 6,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#f2f2f2',
    }
})