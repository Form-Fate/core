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
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
});

const passwordField = z.object({
    type: z.literal("password"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
});

const emailField = z.object({
    type: z.literal("email"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
});

const dateField = z.object({
    type: z.literal("date"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
});

const timeField = z.object({
    type: z.literal("time"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
});

const dataUrlField = z.object({
    type: z.literal("url"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
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
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
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
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
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
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.number().optional(),
}).refine(
    data => !("minimum" in data) && !("maximum" in data),
    { message: "Simple number field should not have minimum or maximum" }
);


// ----------------------------------------
// Boolean field
// ----------------------------------------
const booleanField = z.object({
    type: z.literal("boolean"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.boolean().optional(),
});

const checkboxField = z.object({
    type: z.literal("checkbox"),
    title: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.boolean().optional(),
});

// ----------------------------------------
// Combined property schema as a discriminated union
// ----------------------------------------
const propertySchema = z.union([
    simpleTextField,
    passwordField,
    emailField,
    dateField,
    timeField,
    dataUrlField,
    selectField,
    radioField,
    simpleNumberField,
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
        type: z.enum(["submit", "reset", "button"]).optional(),
        variant: z.string().optional(),
        label: z.string(),
        onClick: z.function().optional(),
        className: z.string().optional(),
    })).optional(),
});
