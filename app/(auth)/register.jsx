import { StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';

// themed components
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import ThemedButton from '../../components/ThemedButton';
import ThemedTextInput from '../../components/ThemedTextInput';
import ThemedLogo from '../../components/ThemedLogo';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useUser } from '../../hooks/useUser';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const { register } = useUser();

    const handleRegister = async () => {
        setError(null);
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await register(email, password, name);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView style={styles.container}>
                <ThemedLogo />
                <Spacer height={10} />
                <ThemedText title={true} style={styles.title}>
                    Create a New Account
                </ThemedText>

                <ThemedTextInput
                    style={{ width: '80%', marginBottom: 20 }}
                    placeholder='Email'
                    keyboardType='email-address'
                    onChangeText={setEmail}
                    value={email}
                />

                <ThemedTextInput
                    style={{ width: '80%', marginBottom: 20 }}
                    placeholder='Name'
                    onChangeText={setName}
                    value={name}
                />

                <ThemedTextInput
                    style={{ width: '80%', marginBottom: 20 }}
                    placeholder='Password'
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                />

                <ThemedTextInput
                    style={{ width: '80%', marginBottom: 20 }}
                    placeholder='Confirm Password'
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    secureTextEntry={true}
                />

                {error && <Spacer height={10} /> && <Text style={styles.error}>{error}</Text>}
                {error && <Spacer height={10} />}

                <ThemedButton onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </ThemedButton>

                <Spacer height={20} />
                <Link href="/login">
                    <ThemedText style={{ textAlign: 'center' }}>
                        Already have an account? Login
                    </ThemedText>
                </Link>
                <Spacer height={100} />
            </ThemedView>
        </TouchableWithoutFeedback>
    );
};

export default Register;

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
        borderColor: Colors.warning,
        borderWidth: 1,
        borderRadius: 6,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#f2f2f2',
    }
});
