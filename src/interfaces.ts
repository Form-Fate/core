
export interface FormDefinition {
    name?: string;
    properties: {
        [key: string]:
        | { type: 'text', title: string, description: string, required?: boolean, validator?: () => boolean }
        | { type: 'password', title: string, description: string, required?: boolean, validator?: () => boolean }
        | { type: 'email', title: string, description: string, required?: boolean, validator?: () => boolean }
        | { type: 'date', title: string, description: string, validator?: () => boolean }
        | { type: 'time', title: string, description: string, required?: boolean, validator?: () => boolean }
        | { type: 'string', title: string, description: string, required?: boolean, validator?: () => boolean }
        | { type: 'select', title: string, description: string, options: { label: string, value: string }[], required?: boolean, validator?: () => boolean }
        | { type: 'radio', title: string, description: string, options: { label: string, value: string }[], required?: boolean, validator?: () => boolean }
        | ({ type: 'number', title: string, description: string, required?: boolean, validator?: () => boolean } & (
            | { minimum?: never, maximum?: never }
            | { minimum: number, maximum: number }
        ))
        | { type: 'boolean', title: string, description: string, required?: boolean, validator?: () => boolean }
        | { type: 'checkbox', title: string, description: string, required?: boolean, validator?: () => boolean }
    };
}