import type AuthService from './auth.service';
import type { dataService as DataService } from './data.service';

export const authService = require('./auth.service').authService as InstanceType<typeof AuthService>;
export const dataService = require('./data.service').dataService as typeof DataService;
export * from './env.service';
export * from './firebase.service';
export * from './localFiles.service';
