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

type CreateVaultProps = {
	showCreateVault: boolean;
	setShowCreateVault: Dispatch<SetStateAction<boolean>>;
	vaultName: string;
	setVaultName: Dispatch<SetStateAction<string>>;
	masterPassword: string;
	setMasterPassword: Dispatch<SetStateAction<string>>;
	createNewVault: () => void;
	loading: boolean;
};

export default function CreateVault({
	showCreateVault,
	setShowCreateVault,
	vaultName,
	setVaultName,
	masterPassword,
	setMasterPassword,
	createNewVault,
	loading,
}: CreateVaultProps) {
	const { t } = useTranslation();

	return (
		<Dialog open={showCreateVault} onOpenChange={setShowCreateVault}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t("modals.createVault.title")}</DialogTitle>
					<DialogDescription>
						{t("modals.createVault.description")}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div>
						<Label htmlFor="vault-name">{t("modals.createVault.vaultName")}</Label>
						<Input
							value={vaultName}
							onChange={(e) => setVaultName(e.target.value)}
							placeholder={t("modals.createVault.placeholder.vaultName")}
							maxLength={50}
						/>
					</div>

					<div>
						<Label htmlFor="master-password">{t("modals.createVault.masterPassword")}</Label>
						<Input
							type="password"
							value={masterPassword}
							onChange={(e) => setMasterPassword(e.target.value)}
							placeholder={t("modals.createVault.placeholder.masterPassword")}
							maxLength={50}
						/>
						<p className="text-xs text-muted-foreground mt-1">
							{t("modals.createVault.warning")}
						</p>
					</div>

					<div className="flex gap-2 pt-4">
						<Button
							onClick={createNewVault}
							disabled={loading}
							className="flex-1"
						>
							{loading ? t("modals.createVault.submitLoading") : t("modals.createVault.submit")}
						</Button>
						<Button
							variant="outline"
							onClick={() => {
								setShowCreateVault(false);
								setVaultName("");
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
