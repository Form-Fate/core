
export interface FormDefinition {
    name?: string;
    properties: {
        [key: string]:
        | { type: 'text', title: string, description: string, required: boolean }
        | { type: 'password', title: string, description: string, required: boolean }
        | { type: 'email', title: string, description: string, required: boolean }
        | { type: 'date', title: string, description: string }
        | { type: 'time', title: string, description: string, required: boolean }
        | { type: 'string', title: string, description: string, required: boolean }
        | { type: 'select', title: string, description: string, options: { label: string, value: string }[], required: boolean }
        | { type: 'radio', title: string, description: string, options: { label: string, value: string }[], required: boolean }
        | ({ type: 'number', title: string, description: string, required: boolean } & (
            | { minimum?: never, maximum?: never }
            | { minimum: number, maximum: number }
        ))
        | { type: 'boolean', title: string, description: string, required: boolean }
        | { type: 'checkbox', title: string, description: string, required: boolean }
    };
}