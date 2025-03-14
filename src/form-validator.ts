import { z } from 'zod';

// ----------------------------------------
// Field variants for string-based inputs
// ----------------------------------------

// Simple text input (no format and no enum)
const simpleTextField = z.object({
    type: z.literal("text"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().optional(),
});

const passwordField = z.object({
    type: z.literal("password"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().optional(),
});

const emailField = z.object({
    type: z.literal("email"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().optional(),
});

const dateField = z.object({
    type: z.literal("date"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().optional(),
});

const timeField = z.object({
    type: z.literal("time"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().optional(),
});

const dataUrlField = z.object({
    type: z.literal("url"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().optional(),
});

// Select input as a select box (dropdown)
// Must include an options array with at least one option.
const selectField = z.object({
    type: z.literal("select"),
    title: z.string(),
    description: z.string(),
    options: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).min(1, { message: "At least one option is required" }),
    required: z.boolean().optional(),
    validator: z.function().optional(),
});

// Radio input as a group of radio buttons
// Must include an options array with at least one option.
const radioField = z.object({
    type: z.literal("radio"),
    title: z.string(),
    description: z.string(),
    options: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).min(1, { message: "At least one option is required" }),
    required: z.boolean().optional(),
    validator: z.function().optional(),
});

// ----------------------------------------
// Field variants for number-based inputs
// ----------------------------------------

// Simple number field without range restrictions
const simpleNumberField = z.object({
    type: z.literal("number"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().optional(),
}).refine(
    data => !("minimum" in data) && !("maximum" in data),
    { message: "Simple number field should not have minimum or maximum" }
);

// Number field as a range slider (must include minimum and maximum)
const rangeField = z.object({
    type: z.literal("number"),
    title: z.string(),
    description: z.string(),
    minimum: z.number(),
    maximum: z.number(),
    required: z.boolean().optional(),
    validator: z.function().optional(),
}).refine(
    data => data.maximum >= data.minimum || data.maximum === undefined || data.minimum === undefined,
    { message: "Maximum must be greater than or equal to minimum" }
);

// ----------------------------------------
// Boolean field
// ----------------------------------------
const booleanField = z.object({
    type: z.literal("boolean"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().optional(),
});

const checkboxField = z.object({
    type: z.literal("checkbox"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().optional(),
});

// ----------------------------------------
// Combined property schema as a discriminated union
// ----------------------------------------
const propertySchema = z.union([
    // For string fields, we union by checking format and enum presence:
    simpleTextField,
    passwordField,
    emailField,
    dateField,
    timeField,
    dataUrlField,
    selectField,
    radioField,
    // For number fields:
    rangeField,
    simpleNumberField,
    // For boolean fields:
    booleanField,
    checkboxField,
]);

// ----------------------------------------
// Overall JSON schema validator for a form
// ----------------------------------------
export const jsonFormSchema = z.object({
    name: z.string().optional(),
    properties: z.record(propertySchema),
    buttons: z.array(z.object({
        label: z.string(),
        onClick: z.function().optional(),
        className: z.string().optional(),
    })).optional(),
});
