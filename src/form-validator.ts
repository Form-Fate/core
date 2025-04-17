import { z } from 'zod';

// ----------------------------------------
// Styling extension for React and React Native
// ----------------------------------------
// This is a generic styling extension that can be used for both React and React Native

const stylingExtension = {
    className: z.string().optional(), // for React (web)
    style: z.any().optional(),        // for React Native (style object)
};

// ----------------------------------------
// URL options schema for fetching data
// ----------------------------------------

const optionsUrlSchema = z.object({
    url: z.string().url({ message: "Must be a valid URL" }),
    method: z.enum(["GET", "POST"]).optional(),
    headers: z.record(z.string()).optional(),
    params: z.record(z.union([z.string(), z.number(), z.boolean()]).transform(String)).optional(),
    body: z.any().optional(), // For POST requests
});

// ----------------------------------------
// Conditional schema for field visibility
// ----------------------------------------
// This schema is used to determine if a field should be displayed based on the state of another field

const conditionalSchema = z.union([
    z.object({
        field: z.string(),
        state: z.boolean(),
        equal: z.string().optional(),
        notEqual: z.string().optional(),
    }).refine(
        data => !(data.equal && data.notEqual),
        { message: "Only one of 'equal' or 'notEqual' can be set" }
    ),
    z.function()
        .args(z.any())
        .returns(z.boolean())
]);

// ----------------------------------------
// Field variants for string-based inputs
// ----------------------------------------
// Simple text input (no format and no enum)

const simpleTextField = z.object({
    type: z.literal("text"),
    title: z.string().optional(),
    description: z.string().optional(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
    minLength: z.number().min(0, { message: "Minimum length must be at least 0" }).optional(),
    maxLength: z.number().min(1, { message: "Maximum length must be at least 1" }).optional(),
    pattern: z.string().optional(),
    conditional: conditionalSchema.optional(),
    disable: z.union([
        z.boolean(),
        z.function().args(z.any()).returns(z.boolean()),
    ]).optional(),
})
    .extend(stylingExtension)
    .superRefine((data, ctx) => {
        if (data.minLength && data.maxLength && data.minLength > data.maxLength) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "minLength cannot be greater than maxLength",
                path: ['minLength'],
            });
        }
    });


const dateField = z.object({
    type: z.literal("date"),
    title: z.string().optional(),
    description: z.string().optional(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
    conditional: z.object({
        field: z.string(),
        state: z.boolean(),
        equal: z.string().optional(),
        notEqual: z.string().optional(),
    }).refine(
        data => !(data.equal && data.notEqual),
        { message: "Only one of 'equal' or 'notEqual' can be set" }
    ).optional(),
}).extend(stylingExtension);

const timeField = z.object({
    type: z.literal("time"),
    title: z.string().optional(),
    description: z.string().optional(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
    conditional: z.object({
        field: z.string(),
        state: z.boolean(),
        equal: z.string().optional(),
        notEqual: z.string().optional(),
    }).refine(
        data => !(data.equal && data.notEqual),
        { message: "Only one of 'equal' or 'notEqual' can be set" }
    ).optional(),
}).extend(stylingExtension);

const dataUrlField = z.object({
    type: z.literal("url"),
    title: z.string().optional(),
    description: z.string().optional(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
    conditional: conditionalSchema.optional(),
    disable: z.union([
        z.boolean(),
        z.function().args(z.any()).returns(z.boolean()),
    ]).optional(),
}).extend(stylingExtension);

// Select input as a select box (dropdown)
// Must include an options array with at least one option.
const selectField = z.object({
    type: z.literal("select"),
    title: z.string().optional(),
    description: z.string().optional(),
    options: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).min(1, { message: "At least one option is required" }),
    optionsUrl: optionsUrlSchema.optional(), // URL to fetch options from
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
    multiple: z.boolean().optional(), // Allow multiple selections
    conditional: conditionalSchema.optional(),
    disable: z.union([
        z.boolean(),
        z.function().args(z.any()).returns(z.boolean()),
    ]).optional(),
}).extend(stylingExtension);

// Radio input as a group of radio buttons
// Must include an options array with at least one option.
const radioField = z.object({
    type: z.literal("radio"),
    title: z.string().optional(),
    description: z.string().optional(),
    options: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).min(1, { message: "At least one option is required" }),
    optionsUrl: optionsUrlSchema.optional(), // URL to fetch options from
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.string().optional(),
    conditional: conditionalSchema.optional(),
    disable: z.union([
        z.boolean(),
        z.function().args(z.any()).returns(z.boolean()),
    ]).optional(),
}).extend(stylingExtension);

// ----------------------------------------
// Field variants for number-based inputs
// ----------------------------------------
// Simple number field without range restrictions

const simpleNumberField = z.object({
    type: z.literal("number"),
    title: z.string().optional(),
    description: z.string().optional(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.number().optional(),
    conditional: conditionalSchema.optional(),
    disable: z.union([
        z.boolean(),
        z.function().args(z.any()).returns(z.boolean()),
    ]).optional(),
    minimum: z.number().optional(),
    maximum: z.number().optional(),
})
    .extend(stylingExtension)
    .refine(
        data => !("minimum" in data) && !("maximum" in data),
        { message: "Simple number field should not have minimum or maximum" }
    );


// ----------------------------------------
// Boolean field
// ----------------------------------------

const booleanField = z.object({
    type: z.literal("boolean"),
    title: z.string().optional(),
    description: z.string().optional(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.boolean().optional(),
    conditional: conditionalSchema.optional(),
    disable: z.union([
        z.boolean(),
        z.function().args(z.any()).returns(z.boolean()),
    ]).optional(),
}).extend(stylingExtension);

const checkboxField = z.object({
    type: z.literal("checkbox"),
    title: z.string().optional(),
    description: z.string().optional(),
    required: z.boolean().optional(),
    validator: z.function().args(z.any()).returns(z.union([z.string(), z.literal(true)]).optional()).optional(),
    default: z.boolean().optional(),
    conditional: conditionalSchema.optional(),
    disable: z.union([
        z.boolean(),
        z.function().args(z.any()).returns(z.boolean()),
    ]).optional(),
}).extend(stylingExtension);

// ----------------------------------------
// Custom Field (User-defined type and properties)
// ----------------------------------------

const customField = z.object({
    type: z.string(), // User-defined type
    title: z.string().optional(),
}).extend(stylingExtension).passthrough(); // Allows additional properties at the same level


// ----------------------------------------
// Combined property schema as a discriminated union
// ----------------------------------------
const propertySchema: z.ZodType<any> = z.lazy(() => z.union([
    simpleTextField,
    dateField,
    timeField,
    dataUrlField,
    selectField,
    radioField,
    simpleNumberField,
    booleanField,
    checkboxField,
    customField, // <<---- Custom Field
    blockField, // <<---- Block Field
]));

// ----------------------------------------
// Block field (nested structure)
// ----------------------------------------
// This is a recursive structure that can contain other fields or blocks
// The "properties" field can contain any of the defined fields or another block

const blockField: z.ZodType<any> = z.object({
    type: z.literal("block"),
    title: z.string().optional(),
    description: z.string().optional(),
    properties: z.record(propertySchema), // Nested properties
    conditional: conditionalSchema.optional(),
}).extend(stylingExtension);

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
