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