export type Todo = {
    id: number | null,
    user_id: number,
    todo_id: number | null,
    subject: string | null,
    description: string | null,
    deadline: string | null,
    status: string | number,
    weight: string | number,
    created_at: string | Date,
    updated_at: string | Date | null 
}

export type User = {
    id: number,
    name: string,
    email: string,
    created_at: string | null,
    updated_at: string | null
}