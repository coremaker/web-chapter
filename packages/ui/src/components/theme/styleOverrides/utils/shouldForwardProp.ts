export const shouldForwardProp = (propName: PropertyKey, propsToSkip: PropertyKey[]) => !propsToSkip.includes(propName);
