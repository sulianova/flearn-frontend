import type { WhereFilterOp } from 'firebase/firestore';

export type TWhereProps = { param: string, value: unknown, operator?: WhereFilterOp }[];
