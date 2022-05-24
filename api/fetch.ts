import { CONFIG } from '../config';
import { BaseAPICall } from './base-api-call';

const { port, url } = CONFIG;

export const baseFetch = (): BaseAPICall => new BaseAPICall(`${url}:${port}/api`);
