
export interface FormDefinition {
    name?: string;
    properties: {
        [key: string]:
        | { type: 'text', title: string, description: string, required?: boolean, validator?: (value: any) => boolean }
        | { type: 'password', title: string, description: string, required?: boolean, validator?: (value: any) => boolean }
        | { type: 'email', title: string, description: string, required?: boolean, validator?: (value: any) => boolean }
        | { type: 'date', title: string, description: string, validator?: (value: any) => boolean }
        | { type: 'time', title: string, description: string, required?: boolean, validator?: (value: any) => boolean }
        | { type: 'string', title: string, description: string, required?: boolean, validator?: (value: any) => boolean }
        | { type: 'select', title: string, description: string, options: { label: string, value: string }[], required?: boolean, validator?: (value: any) => boolean }
        | { type: 'radio', title: string, description: string, options: { label: string, value: string }[], required?: boolean, validator?: (value: any) => boolean }
        | ({ type: 'number', title: string, description: string, required?: boolean, validator?: (value: any) => boolean } & (
            | { minimum?: never, maximum?: never }
            | { minimum: number, maximum: number }
        ))
        | { type: 'boolean', title: string, description: string, required?: boolean, validator?: (value: any) => boolean }
        | { type: 'checkbox', title: string, description: string, required?: boolean, validator?: (value: any) => boolean }
    };
}