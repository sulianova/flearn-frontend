type IEmail = string;
export type TAccess = 'FREE' | 'BASE' | 'OPTIMAL' | 'EXTENDED';

export type TAccessData = Record<IEmail, TAccess | undefined>
