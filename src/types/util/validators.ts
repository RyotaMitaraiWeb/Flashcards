export type ValidatorFunction = (value: string) => (string | boolean) | Promise<string | boolean>;
