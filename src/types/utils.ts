export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export type AddOptionalObject<A extends object, B extends object> = A | (A & B);
