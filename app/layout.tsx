import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { detectLocale } from "./i18n/detect";
import { getTranslation } from "./i18n/server";
import { I18nProvider } from "./i18n/provider";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await detectLocale();
	const i18n = await getTranslation(locale);
	
	return {
		title: i18n.t("metadata.title"),
		description: i18n.t("metadata.description"),
		icons: {
			icon: "/favicon.svg",
		},
	};
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await detectLocale();
	
	return (
		<html lang={locale}>
			<body>
				<I18nProvider locale={locale}>
					{children}
					<Toaster richColors position="top-center" />
					<Analytics />
					<SpeedInsights />
				</I18nProvider>
			</body>
		</html>
	);
}
