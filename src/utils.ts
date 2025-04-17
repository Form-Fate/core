export const extractDefaults = (schema: Record<string, any>): Record<string, unknown> => {
    const walk = (properties: Record<string, any>): Record<string, unknown> => {
        const result: Record<string, unknown> = {};

        for (const key in properties) {
            const prop = properties[key];

            if ('default' in prop) {
                result[key] = prop.default;
            }

            if (prop.type === 'block' && prop.properties) {
                result[key] = walk(prop.properties); // Recursively build nested object
            }
        }

        return result;
    };

    if (!schema.properties) {
        return {};
    }

    return walk(schema.properties);
};
