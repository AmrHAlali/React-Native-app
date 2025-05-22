
import { Stack } from 'expo-router'
import { use } from 'react'
import { useUser } from '../../hooks/useUser';
import { StatusBar } from 'react-native'
import GuestOnly from "../../components/auth/GuestOnly";

export default function AuthLayout() {

  const { user } = useUser()
  console.log(user)

  return (
    <GuestOnly>
        <StatusBar barStyle="auto" />
        <Stack 
            screenOptions={{headerShown: false, animation: "none",}} 
        />
    </GuestOnly>
  )
}
