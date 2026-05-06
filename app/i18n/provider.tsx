"use client";

import { type ReactNode, useEffect } from "react";
import { i18next } from "./client";
import { defaultLocale } from "./config";

interface I18nProviderProps {
	children: ReactNode;
	locale: string;
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
	useEffect(() => {
		if (i18next.language !== locale) {
			i18next.changeLanguage(locale);
		}
	}, [locale]);

	return <>{children}</>;
}
