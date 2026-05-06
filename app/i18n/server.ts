import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { i18nConfig } from "./config";

export async function getTranslation(locale: string, ns = "translation") {
	const i18n = createInstance();
	await i18n
		.use(
			resourcesToBackend(
				(language: string) => import(`./locales/${language}.json`),
			),
		)
		.init({
			...i18nConfig,
			lng: locale,
			ns,
		});
	return i18n;
}
