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
import { useTranslation } from "@/app/i18n/client";

type OpenVaultProps = {
	showOpenVault: boolean;
	setShowOpenVault: Dispatch<SetStateAction<boolean>>;
	masterPassword: string;
	setMasterPassword: Dispatch<SetStateAction<string>>;
	openExistingVault: () => void;
	loading: boolean;
};

export default function OpenVault({
	showOpenVault,
	setShowOpenVault,
	masterPassword,
	setMasterPassword,
	openExistingVault,
	loading,
}: OpenVaultProps) {
	const { t } = useTranslation();

	return (
		<Dialog open={showOpenVault} onOpenChange={setShowOpenVault}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t("modals.openVault.title")}</DialogTitle>
					<DialogDescription>
						{t("modals.openVault.description")}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div>
						<Label htmlFor="master-password-open">{t("modals.openVault.masterPassword")}</Label>
						<Input
							type="password"
							value={masterPassword}
							onChange={(e) => setMasterPassword(e.target.value)}
							placeholder={t("modals.openVault.placeholder")}
							maxLength={50}
						/>
					</div>

					<div className="flex gap-2 pt-4">
						<Button
							onClick={openExistingVault}
							disabled={loading}
							className="flex-1"
						>
							{loading ? t("modals.openVault.submitLoading") : t("modals.openVault.submit")}
						</Button>
						<Button
							variant="outline"
							onClick={() => {
								setShowOpenVault(false);
								setMasterPassword("");
							}}
							disabled={loading}
						>
							{t("common.cancel")}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
