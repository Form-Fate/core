import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { jsonFormSchema } from './form-validator';
import { extractDefaults } from './utils';

// Type from Zod schema
export type FormDefinition = z.infer<typeof jsonFormSchema>;

export function useFormFate(formDefinition: Record<string, unknown>): UseFormReturn<Record<string, unknown>> {
    // Validate the form definition using the JSON schema
    const parseResult = jsonFormSchema.safeParse(formDefinition);
    if (!parseResult.success) {
        throw new Error(
            `Invalid form definition: ${JSON.stringify(
                parseResult.error.format(),
                null,
                2
            )}`
        );
    }

    const defaultValues = formDefinition.properties ? extractDefaults(formDefinition) : {};

    // Create the react-hook-form instance using useForm
    return useForm<Record<string, unknown>>({
        defaultValues,
    });
}      