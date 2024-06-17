type TEmail = string;
export type TAccess = 'FREE' | 'BASE' | 'OPTIMAL' | 'EXTENDED';

export type TAccessData = Record<TEmail, TAccess | undefined>
