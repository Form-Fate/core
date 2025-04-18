import {
    blockField, booleanField, checkboxField,
    conditionalSchema, customField, dataUrlField, dateField,
    optionsUrlSchema, radioField, selectField, simpleNumberField,
    simpleTextField, timeField
} from './form-validator';

import { z } from 'zod';

export type blockFieldInterface = z.infer<typeof blockField>;
export type booleanFieldInterface = z.infer<typeof booleanField>;
export type checkboxFieldInterface = z.infer<typeof checkboxField>;
export type conditionalSchemaInterface = z.infer<typeof conditionalSchema>;
export type customFieldInterface = z.infer<typeof customField>;
export type dataUrlFieldInterface = z.infer<typeof dataUrlField>;
export type dateFieldInterface = z.infer<typeof dateField>;
export type optionsUrlSchemaInterface = z.infer<typeof optionsUrlSchema>;
export type radioFieldInterface = z.infer<typeof radioField>;
export type selectFieldInterface = z.infer<typeof selectField>;
export type simpleNumberFieldInterface = z.infer<typeof simpleNumberField>;
export type simpleTextFieldInterface = z.infer<typeof simpleTextField>;
export type timeFieldInterface = z.infer<typeof timeField>;
export type formFieldInterface = blockFieldInterface | booleanFieldInterface | checkboxFieldInterface | conditionalSchemaInterface | customFieldInterface | dataUrlFieldInterface | dateFieldInterface | optionsUrlSchemaInterface | radioFieldInterface | selectFieldInterface | simpleNumberFieldInterface | simpleTextFieldInterface | stylingExtensionInterface | timeFieldInterface;