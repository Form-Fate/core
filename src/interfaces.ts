
export interface FormDefinition {
    name?: string;
    properties: {
        [key: string]:
        | { type: 'text', title: string, description: string, required?: boolean, validator?: () => void }
        | { type: 'password', title: string, description: string, required?: boolean, validator?: () => void }
        | { type: 'email', title: string, description: string, required?: boolean, validator?: () => void }
        | { type: 'date', title: string, description: string, validator?: () => void }
        | { type: 'time', title: string, description: string, required?: boolean, validator?: () => void }
        | { type: 'string', title: string, description: string, required?: boolean, validator?: () => void }
        | { type: 'select', title: string, description: string, options: { label: string, value: string }[], required?: boolean, validator?: () => void }
        | { type: 'radio', title: string, description: string, options: { label: string, value: string }[], required?: boolean, validator?: () => void }
        | ({ type: 'number', title: string, description: string, required?: boolean, validator?: () => void } & (
            | { minimum?: never, maximum?: never }
            | { minimum: number, maximum: number }
        ))
        | { type: 'boolean', title: string, description: string, required?: boolean, validator?: () => void }
        | { type: 'checkbox', title: string, description: string, required?: boolean, validator?: () => void }
    };
}