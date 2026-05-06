"use client";

import i18next from "i18next";
import {
	initReactI18next,
	useTranslation as useTranslationOrg,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { i18nConfig } from "./config";

i18next
	.use(initReactI18next)
	.use(
		resourcesToBackend(
			(language: string) => import(`./locales/${language}.json`),
		),
	)
	.init(i18nConfig);

export function useTranslation(ns = "translation") {
	return useTranslationOrg(ns);
}

export { i18next };
