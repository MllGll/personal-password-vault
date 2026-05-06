import { Plus } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Credential } from "@/types";
import { Textarea } from "../ui/textarea";
import { useTranslation } from "@/app/i18n/client";

type AddCredentialProps = {
	showAddCredential: boolean;
	setShowAddCredential: Dispatch<SetStateAction<boolean>>;
	newCredential: Partial<Credential>;
	setNewCredential: Dispatch<SetStateAction<Partial<Credential>>>;
	addCredential: () => void;
	categories: Array<string>;
	categoryColors: Record<string, { bg: string; text: string }>;
};

export default function AddCredential({
	showAddCredential,
	setShowAddCredential,
	newCredential,
	setNewCredential,
	addCredential,
	categories,
	categoryColors,
}: AddCredentialProps) {
	const { t } = useTranslation();

	const getCategoryKey = (category: string): string => {
		const keyMap: Record<string, string> = {
			"Email": "email",
			"Redes Sociais": "social",
			"Trabalho": "work",
			"Bancos": "banking",
			"Compras": "shopping",
			"Streamings": "streaming",
			"Games": "games",
			"Educação": "education",
			"Saúde": "health",
			"Outros": "others"
		};
		return keyMap[category] || category.toLowerCase();
	};

	return (
		<Dialog open={showAddCredential} onOpenChange={setShowAddCredential}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>{t("modals.addCredential.title")}</DialogTitle>
					<DialogDescription>
						{t("modals.addCredential.description")}
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="cred-name">{t("credential.name")}</Label>
							<Input
								value={newCredential.name || ""}
								onChange={(e) =>
									setNewCredential((prev) => ({
										...prev,
										name: e.target.value,
									}))
								}
								placeholder={t("modals.addCredential.placeholder.name")}
								maxLength={50}
							/>
						</div>

						<div>
							<Label htmlFor="cred-category">{t("credential.category")}</Label>
							<Select
								value={newCredential.category}
								onValueChange={(value) =>
									setNewCredential((prev) => ({
										...prev,
										category: value,
									}))
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem key={category} value={category}>
											<div className="flex items-center gap-2">
												<div
													className={`w-3 h-3 rounded-full ${categoryColors[category].bg}`}
												/>
												{t(`categories.${getCategoryKey(category)}`)}
											</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="cred-username">{t("credential.username")}</Label>
							<Input
								value={newCredential.username || ""}
								onChange={(e) =>
									setNewCredential((prev) => ({
										...prev,
										username: e.target.value,
									}))
								}
								placeholder={t("modals.addCredential.placeholder.username")}
								maxLength={50}
							/>
						</div>

						<div>
							<Label htmlFor="cred-password">{t("credential.password")}</Label>
							<Input
								type="password"
								value={newCredential.password || ""}
								onChange={(e) =>
									setNewCredential((prev) => ({
										...prev,
										password: e.target.value,
									}))
								}
								placeholder={t("modals.addCredential.placeholder.password")}
								maxLength={50}
							/>
						</div>
					</div>

					<div>
						<Label htmlFor="cred-url">{t("credential.url")} ({t("common.optional")})</Label>
						<Input
							value={newCredential.url || ""}
							onChange={(e) =>
								setNewCredential((prev) => ({
									...prev,
									url: e.target.value,
								}))
							}
							placeholder={t("modals.addCredential.placeholder.url")}
							maxLength={100}
						/>
					</div>

					<div>
						<Label htmlFor="cred-notes">{t("credential.notes")} ({t("common.optional")})</Label>
						<Textarea
							value={newCredential.notes || ""}
							onChange={(e) =>
								setNewCredential((prev) => ({
									...prev,
									notes: e.target.value,
								}))
							}
							placeholder={t("modals.addCredential.placeholder.notes")}
							rows={3}
							maxLength={500}
						/>
					</div>

					<div className="flex gap-2 pt-4">
						<Button onClick={addCredential} className="flex-1">
							<Plus className="w-4 h-4 mr-2" />
							{t("modals.addCredential.submit")}
						</Button>
						<Button
							variant="outline"
							onClick={() => setShowAddCredential(false)}
						>
							{t("common.cancel")}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
