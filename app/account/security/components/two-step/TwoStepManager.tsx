"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AuthenticatorSetup } from "./AuthenticatorSetup"
import { BackupCodes } from "./BackupCodes"
import { useTwoStep, TwoStepMethod } from "../../../../../features/security/two-step/useTwoStep"

export function TwoStepManager() {
    const {
        isEnabled,
        isLoading,
        error,
        qrCodeUrl,
        manualKey,
        backupCodes,
        methodsEnabled,
        setupTwoStep,
        confirmCode,
        turnOffTwoStep,
        refreshBackupCodes,
    } = useTwoStep()

    const [isSettingUp, setIsSettingUp] = useState(false)

    const handleEnable = async () => {
        await setupTwoStep({
            authenticator: true,
            backupCodes: true,
            email: true,
            sms: false, // optional
        })

        setIsSettingUp(true)
    }

    return (
        <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Two-Step Verification</h3>
                    <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                    </p>
                </div>

                {isEnabled ? (
                    <Button
                        variant="destructive"
                        onClick={turnOffTwoStep}
                        disabled={isLoading}
                    >
                        Disable
                    </Button>
                ) : (
                    <Button onClick={handleEnable} disabled={isLoading}>
                        Enable
                    </Button>
                )}
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            {!isEnabled && isSettingUp && qrCodeUrl && (
                <AuthenticatorSetup
                    qrCode={qrCodeUrl}
                    manualKey={manualKey}
                    onComplete={() => confirmCode("authenticator", "123456")}
                    onCancel={() => setIsSettingUp(false)}
                />
            )}

            {isEnabled && (
                <BackupCodes
                    codes={backupCodes}
                    onComplete={() => confirmCode("backupCodes", "CODE")}
                    refresh={refreshBackupCodes}
                />
            )}
        </Card>
    )
}
