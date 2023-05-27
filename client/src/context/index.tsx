import React from 'react';
import { AuthProvider } from './auth-context';
import { AppProp } from '../types';
export const AppProviders = (props: AppProp) => {
  return <AuthProvider>{props.children}</AuthProvider>;
};
