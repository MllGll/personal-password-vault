import { cookies, headers } from "next/headers";
import { defaultLocale, locales } from "./config";

export async function detectLocale(): Promise<string> {
	// 1. Check user cookie (persistent preference)
	const cookieStore = await cookies();
	const cookieLang = cookieStore.get("i18next")?.value;
	if (cookieLang && locales.includes(cookieLang as any)) {
		return cookieLang;
	}

	// 2. Detect from browser language (first visit)
	const headersList = await headers();
	const acceptLang = headersList.get("accept-language");
	if (acceptLang?.toLowerCase().startsWith("pt")) {
		return "pt-BR";
	}

	// 3. Default: English
	return defaultLocale;
}
