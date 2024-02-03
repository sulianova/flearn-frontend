import type { WhereFilterOp } from 'firebase/firestore';

export type TWhereProps = { param: string | string[], value: unknown, operator?: WhereFilterOp }[];
