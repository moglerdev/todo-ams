export type Todo = {
    id: number | null,
    subject: string,
    description: string,
    deadline: string | Date,
    state: string | number,
    weight: string | number,
    autor: string | number,
    created_at: string | Date | undefined,
    updated_at: string | Date | undefined
}