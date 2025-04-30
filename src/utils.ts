export const extractDefaults = (schema: Record<string, any>): Record<string, unknown> => {
    const result: Record<string, unknown> = {};

    const walk = (properties: Record<string, any>) => {
        for (const key in properties) {
            const prop = properties[key];

            if (prop.type === 'block' && prop.properties) {
                walk(prop.properties); // Continue recursion without nesting under `key`
            }

            result[key] = 'default' in prop ? prop.default : ['select', 'radio'].includes(prop.type) ? prop.options?.[0]?.value ?? '' : '';

        }
    };

    if (schema.properties) {
        walk(schema.properties);
    }

    return result;
};
