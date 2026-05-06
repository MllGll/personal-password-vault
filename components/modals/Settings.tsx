import { Globe, Monitor, Moon, Sun, TriangleAlert } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { AppSettings } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useTranslation } from "@/app/i18n/client";
import { type Locale } from "@/app/i18n/config";

type SettingsProps = {
	showSettings: boolean;
	setShowSettings: Dispatch<SetStateAction<boolean>>;
	settings: AppSettings;
	setSettings: Dispatch<SetStateAction<AppSettings>>;
	saveSettings: () => void;
};

export default function Settings({
	showSettings,
	setShowSettings,
	settings,
	setSettings,
	saveSettings,
}: SettingsProps) {
	const { t, i18n } = useTranslation();

	// Estado temporário para o idioma selecionado
	const [pendingLanguage, setPendingLanguage] = useState<Locale>(i18n.language as Locale);

	// Sincroniza o estado temporário quando o modal abre
	useEffect(() => {
		if (showSettings) {
			setPendingLanguage(i18n.language as Locale);
		}
	}, [showSettings, i18n.language]);

	const handleLanguageChange = (value: Locale) => {
		setPendingLanguage(value);
	};

	const handleSave = () => {
		// Aplica a mudança de idioma antes de salvar
		if (pendingLanguage !== i18n.language) {
			i18n.changeLanguage(pendingLanguage);
			document.cookie = `i18next=${pendingLanguage}; path=/; max-age=31536000`;
		}
		saveSettings();
	};

	const getTimeoutLabel = (minutes: number): string => {
		if (minutes === 0) return t("modals.settings.timeouts.disabled");
		if (minutes === 60) return t("modals.settings.timeouts.hours_one", { count: 1 });
		return t("modals.settings.timeouts.minutes_one", { count: minutes });
	};

	return (
		<Dialog open={showSettings} onOpenChange={setShowSettings}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t("modals.settings.title")}</DialogTitle>
					<DialogDescription>
						{t("modals.settings.description")}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					<div>
						<Label>{t("modals.settings.language")}</Label>
						<Select
							value={pendingLanguage}
							onValueChange={(value) => handleLanguageChange(value as Locale)}
						>
							<SelectTrigger>
								<div className="flex items-center gap-2">
									<Globe className="w-4 h-4" />
									<SelectValue />
								</div>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="en-US">🇺🇸 English</SelectItem>
								<SelectItem value="pt-BR">🇧🇷 Português</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label>{t("modals.settings.theme")}</Label>
						<Select
							value={settings.theme}
							onValueChange={(value: "light" | "dark" | "system") =>
								setSettings((prev) => ({ ...prev, theme: value }))
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="light">
									<div className="flex items-center gap-2">
										<Sun className="w-4 h-4" />
										{t("modals.settings.themes.light")}
									</div>
								</SelectItem>
								<SelectItem value="dark">
									<div className="flex items-center gap-2">
										<Moon className="w-4 h-4" />
										{t("modals.settings.themes.dark")}
									</div>
								</SelectItem>
								<SelectItem value="system">
									<div className="flex items-center gap-2">
										<Monitor className="w-4 h-4" />
										{t("modals.settings.themes.system")}
									</div>
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label>{t("modals.settings.lockTimeout")}</Label>
						<Select
							value={settings.lockTimeout.toString()}
							onValueChange={(value) =>
								setSettings((prev) => ({
									...prev,
									lockTimeout: Number.parseInt(value),
								}))
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="0">
									{getTimeoutLabel(0)}
								</SelectItem>
								<SelectItem value="1">
									{getTimeoutLabel(1)}
								</SelectItem>
								<SelectItem value="5">
									{getTimeoutLabel(5)}
								</SelectItem>
								<SelectItem value="10">
									{getTimeoutLabel(10)}
								</SelectItem>
								<SelectItem value="15">
									{getTimeoutLabel(15)}
								</SelectItem>
								<SelectItem value="30">
									{getTimeoutLabel(30)}
								</SelectItem>
								<SelectItem value="60">
									{getTimeoutLabel(60)}
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Alert className="bg-yellow-50 text-yellow-800 border border-yellow-200">
						<AlertTitle>{t("modals.settings.about.title")}</AlertTitle>
						<AlertDescription>
							<p>{t("modals.settings.about.description")}</p>
							<ul className="list-inside list-disc text-sm">
								<li>
									{t("modals.settings.about.description")}
								</li>
							</ul>
						</AlertDescription>
					</Alert>

					<div className="flex gap-2 pt-4">
						<Button onClick={handleSave} className="flex-1">
							{t("modals.settings.submit")}
						</Button>
						<Button variant="outline" onClick={() => setShowSettings(false)}>
							{t("common.cancel")}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
