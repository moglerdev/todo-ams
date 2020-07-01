export type Todo = {
    id: number | null,
    subject: string | null,
    description: string | null,
    deadline: string | Date | null,
    status: string | number,
    weight: string | number,
    autor: string | number,
    created_at: string | Date,
    updated_at: string | Date | null 
}