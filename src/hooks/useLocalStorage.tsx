import { useEffect, useState } from "react"

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error("Erreur de récupération des données dans le localStorage", error)
            return initialValue
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (error) {
            console.error("Erreur de sauvegarde des données dans le localStorage", error)
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue] as const
}