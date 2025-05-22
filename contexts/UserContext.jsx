import { createContext } from 'react';
import { useState, useEffect } from 'react';
import { account } from "../lib/appwrite"
import { ID } from 'react-native-appwrite'

export const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [authChecked, setAuthChecked] = useState(false);

    async function login(email, password) {
        try {
            await account.createEmailPasswordSession(email, password)
            const response = await account.get()

            setUser(response)
        } catch (error) {
            throw Error(error.message)
        }
    }

    async function register(email, password, name) {
        try {
            await account.create(ID.unique(), email, password, name);

            await login(email, password);

            const user = await account.get();

            await databases.createDocument(
                'your_database_id',
                'your_users_collection_id',
                user.$id,
            );

        } catch (error) {
            throw Error(error.message);
        }
    }

    async function logout() {
        await account.deleteSession('current');
        setUser(null)
    }

    async function getInitialUserValue() {
        try {
            const response = await account.get()
            setUser(response)
        } catch (error) {
            setUser(null);
        } finally {
            setAuthChecked(true);
        }
    }

    useEffect(() => (
        getInitialUserValue()
    ), [])

    return (
        <UserContext.Provider value={{ user, login, register, logout,
            authChecked }}>
            {children}
        </UserContext.Provider>
    )
}
