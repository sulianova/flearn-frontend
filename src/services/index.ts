import type AuthService from './auth.service';

export const authService = require('./auth.service').authService as InstanceType<typeof AuthService>;
export * from './data.service';
export * from './env.service';
export * from './firebase.service';
export * from './localFiles.service';
