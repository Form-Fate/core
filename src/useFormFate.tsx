import { useForm, Resolver } from 'react-hook-form';
import { ZodError } from 'zod';
import { jsonFormSchema } from './form-validator';
import { useMemo } from 'react';
import { FormDefinition } from './interfaces';

interface UseDynamicFormProps {
    formDefinition: FormDefinition;
    onSubmit: (data: Record<string, unknown>) => void;
}

export const useFormFate = ({ formDefinition, onSubmit }: UseDynamicFormProps) => {
    const validatedSchema = useMemo(() => {
        try {
            return jsonFormSchema.parse(formDefinition);
        } catch (error) {
            console.error('Invalid form schema provided to useDynamicForm:', error);
            throw error;
        }
    }, [formDefinition]);

    // Custom resolver using the validated schema
    const resolver: Resolver = async () => {
        try {
            const parsedData = jsonFormSchema.parse(formDefinition);
            return { values: parsedData, errors: {} };
        } catch (error) {
            if (error instanceof ZodError) {
                return {
                    values: {},
                    errors: error.errors.reduce(
                        (acc, err) => ({
                            ...acc,
                            [err.path.join('.')]: { message: err.message }
                        }),
                        {} as Record<string, { message: string }>
                    ),
                };
            }
            console.error('Unexpected validation error:', error);
            return { values: {}, errors: {} };
        }
    };

    // Initialize React Hook Form.
    const { register, getValues, formState: { errors } } = useForm({ resolver });

    return {
        validatedSchema,
        register,
        getValues,
        errors,
        onSubmit,
    };
};
