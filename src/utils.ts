export const extractDefaults = (schema: Record<string, any>): Record<string, unknown> => {
    const result: Record<string, unknown> = {};

    const walk = (properties: Record<string, any>) => {
        for (const key in properties) {
            const prop = properties[key];

            if ('default' in prop) {
                result[key] = prop.default;
            }

            if (prop.properties) {
                walk(prop.properties);
            }
        }
    };

    if (schema.properties) {
        walk(schema.properties);
    }

    return result;
};
