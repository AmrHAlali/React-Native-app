import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useUser } from '../../hooks/useUser';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import ThemedButton from '../../components/ThemedButton';
import ThemedList from '../../components/ThemedList';
import { router } from 'expo-router';

const Profile = () => {
  const { logout, user } = useUser();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
        <ThemedView style={styles.circle}>
          <Icon name="person" size={60} color="#fff" />
        </ThemedView>
        
        <Spacer width={20}/>

        <ThemedView>
          <ThemedText title={true} style={styles.heading}>
            {user.name}
          </ThemedText>
          <ThemedText>
            {user.email}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <Spacer height={50}/>

      <ThemedView>
        <Pressable onPress={() => { router.push("/completed_books") }}>
          <ThemedList
            iconName="book"
            text="Completed Books:"
            status={1} 
          />
        </Pressable>

        <Pressable onPress={() => { router.push("/wishlist") }}>
          <ThemedList
            iconName="star"
            text="Wish List:"
            status={2} 
          />
        </Pressable>
      </ThemedView>

      <Spacer height={80}/>

      <ThemedButton onPress={logout}>
        <Text style={{ color: '#f2f2f2' }}>Logout</Text>
      </ThemedButton>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 90,
    backgroundColor: "#888",
    justifyContent: "center",
    alignItems: "center",
  },
});