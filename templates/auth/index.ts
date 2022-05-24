import { User } from '../../types/auth';

export const getAuthDefaultState = (): User => {
  return {
    name: null,
    token: null,
    access: [],
  };
};
