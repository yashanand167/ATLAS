export interface Notes {
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface NotesStore {
    notes: Notes[],
    addNote: (note: Notes) => void,
    updateNote: (id: string, note: Notes) => void,
    deleteNote: (id: string) => void,
}