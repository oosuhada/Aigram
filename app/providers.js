'use client';

import React from "react";
import { LanguageProvider } from "../src/context/LanguageContext";
import { UserProvider } from "../src/context/UserContext";

export function Providers({ children }) {
  return (
    <LanguageProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </LanguageProvider>
  );
}
