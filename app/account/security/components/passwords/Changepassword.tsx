"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Props = {
    onSuccess?: () => void;
};

export function ChangePasswordDialog({ onSuccess }: Props) {
    const [step, setStep] = useState<"verify" | "change">("verify");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        setLoading(true);
        setError(null);
        const isValid = true; // Mock always valid
        if (!isValid) {
            setError("Current password is incorrect.");
            setLoading(false);
            return;
        }
        setStep("change");
        setLoading(false);
    };

    const handleChangePassword = async () => {
        setError(null);
        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        console.log("New password:", newPassword);
        setLoading(false);
        onSuccess?.();
    };

    return (
        <div className="space-y-6">
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {step === "verify" && (
                <div className="space-y-4">
                    <div>
                        <Label>Current password</Label>
                        <Input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleVerify} disabled={!currentPassword || loading} className="w-full">
                        Verify
                    </Button>
                </div>
            )}

            {step === "change" && (
                <div className="space-y-4">
                    <div>
                        <Label>New password</Label>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Confirm new password</Label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={handleChangePassword}
                        disabled={!newPassword || !confirmPassword || loading}
                        className="w-full"
                    >
                        Save password
                    </Button>
                </div>
            )}
        </div>
    );
}
