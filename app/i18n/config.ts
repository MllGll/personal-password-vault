export const defaultLocale = "en-US";
export const locales = ["en-US", "pt-BR"] as const;
export type Locale = (typeof locales)[number];

export const i18nConfig = {
	defaultLocale,
	locales,
	fallbackLng: defaultLocale,
	defaultNS: "translation",
	interpolation: {
		escapeValue: false,
	},
	react: {
		useSuspense: false,
	},
};
