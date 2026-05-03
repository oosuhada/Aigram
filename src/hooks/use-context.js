import { useContext } from "react";
import { LanguageContext, UserContext } from "../context/contexts";

export const useLanguage = () => useContext(LanguageContext);
export const useUser = () => useContext(UserContext);
