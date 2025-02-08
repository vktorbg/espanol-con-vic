import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import "./src/styles/global.css";

export const wrapRootElement = ({ element }) => (
  <AuthProvider>{element}</AuthProvider>
);
