import { useContext } from "react";
import { GoogleBooksContext } from "../contexts/GoogleBooksContext";

export function useGoogleBooks() {
    const context = useContext(GoogleBooksContext);

    if (!context) {
        throw new Error("useGoogleBooks must be used within a GoogleBooksProvider");
    }

    return context;
}
