export interface FormFateTriggers {
    label: string,
    type: HTMLButtonElement['type'],
    className?: string,
    onClick?: () => void;
}
export interface FormDefinition {
    name?: string;
    properties: {
        [key: string]:
        | { type: 'text', title: string, description: string }
        | { type: 'password', title: string, description: string }
        | { type: 'email', title: string, description: string }
        | { type: 'date', title: string, description: string }
        | { type: 'time', title: string, description: string }
        | { type: 'string', title: string, description: string }
        | { type: 'select', title: string, description: string, options: { label: string, value: string }[] }
        | { type: 'radio', title: string, description: string, options: { label: string, value: string }[] }
        | ({ type: 'number', title: string, description: string } & (
            | { minimum?: never, maximum?: never }
            | { minimum: number, maximum: number }
        ))
        | { type: 'boolean', title: string, description: string }
        | { type: 'checkbox', title: string, description: string };
    };
    required?: string[];
    buttons: FormFateTriggers[];
};