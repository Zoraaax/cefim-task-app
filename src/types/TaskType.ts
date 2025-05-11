export type Task = {
    id: number
    title: string
    description: string
    status: "En attente" | "En cours" | "Terminée"
    endDate: Date
}