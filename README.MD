# Form Validator Core

This library provides a schema-based form validation system using `zod`. It allows you to define form fields, their types, validation rules, and conditional logic in a structured JSON format.

## Installation

To use the library, install `formfatecore` :

```bash
npm i formfatecore
```

## Usage

### Importing the Schema

Import the `jsonFormSchema` from the library:

```typescript
import { FormDefinition, useFormFate } from "formfatecore";


... 


const form = useFormFate(formDefinitionObject);
const { handleSubmit, control, setValue, watch } = form;

```

### JSON Schema Structure

The JSON schema for a form should follow this structure:

#### Root Object

- **`name`** (optional): A string representing the name of the form.
- **`properties`**: An object where each key is the field name, and the value is the field definition (see below for field types).
- **`buttons`** (optional): An array of button definitions.

#### Field Types

The `properties` object supports the following field types:

1. **Text Field**
   ```json
   {
       "type": "text",
       "title": "Your Name",
       "description": "Enter your full name",
       "required": true,
       "minLength": 3,
       "maxLength": 50
   }
   ```

2. **Password Field**
   ```json
   {
       "type": "password",
       "title": "Password",
       "description": "Enter a secure password",
       "required": true,
       "minLength": 8
   }
   ```

3. **Email Field**
   ```json
   {
       "type": "email",
       "title": "Email Address",
       "description": "Enter your email",
       "required": true
   }
   ```

4. **Date Field**
   ```json
   {
       "type": "date",
       "title": "Date of Birth",
       "description": "Select your birth date"
   }
   ```

5. **Time Field**
   ```json
   {
       "type": "time",
       "title": "Preferred Time",
       "description": "Select a time"
   }
   ```

6. **URL Field**
   ```json
   {
       "type": "url",
       "title": "Website",
       "description": "Enter your website URL"
   }
   ```

7. **Select Field**
   ```json
   {
       "type": "select",
       "title": "Country",
       "description": "Select your country",
       "options": [
           { "label": "USA", "value": "us" },
           { "label": "Canada", "value": "ca" }
       ],
       "required": true
   }
   ```

8. **Radio Field**
   ```json
   {
       "type": "radio",
       "title": "Gender",
       "description": "Select your gender",
       "options": [
           { "label": "Male", "value": "male" },
           { "label": "Female", "value": "female" }
       ]
   }
   ```

9. **Number Field**
   ```json
   {
       "type": "number",
       "title": "Age",
       "description": "Enter your age",
       "required": true
   }
   ```

10. **Boolean Field**
    ```json
    {
        "type": "boolean",
        "title": "Subscribe",
        "description": "Subscribe to our newsletter"
    }
    ```

11. **Checkbox Field**
    ```json
    {
        "type": "checkbox",
        "title": "Accept Terms",
        "description": "I agree to the terms and conditions",
        "required": true
    }
    ```

12. **Custom Field**
    ```json
    {
        "type": "custom",
        "title": "Custom Field",
        "customProperty": "value"
    }
    ```

#### Conditional Logic

Fields can include a `conditional` object to define dependencies on other fields:

```json
{
    "conditional": {
        "field": "subscribe",
        "state": true,
        "equal": "yes"
    }
}
```

#### Buttons

Buttons can be defined as follows:

```json
{
    "buttons": [
        {
            "type": "submit",
            "label": "Submit",
            "variant": "primary"
        },
        {
            "type": "reset",
            "label": "Reset"
        }
    ]
}
```

### Validation

To validate a JSON schema, use the `jsonFormSchema`:

```typescript
const formData = {
    name: "Example Form",
    properties: {
        username: {
            type: "text",
            title: "Username",
            description: "Enter your username",
            required: true
        }
    },
    buttons: [
        { type: "submit", label: "Submit" }
    ]
};

try {
    jsonFormSchema.parse(formData);
    console.log("Form is valid!");
} catch (error) {
    console.error("Validation failed:", error.errors);
}
```

## License

This library is open-source and available under the MIT license.
