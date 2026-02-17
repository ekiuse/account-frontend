import { TwoStepSetupResponse, BackupCodesResponse } from "./type"
import { TwoStepMethod } from "./useTwoStep"

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function enableTwoStep(): Promise<TwoStepSetupResponse> {
    await delay(800)

    return {
        qrCodeUrl:
            "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/demo",
        manualKey: "ABCD-EFGH-IJKL-MNOP",
    }
}

export async function verifyTwoStepCode(method: TwoStepMethod, code: string) {
    await delay(600)

    if (code !== "123456") {
        throw new Error("Invalid verification code")
    }
}

export async function disableTwoStep(): Promise<void> {
    await delay(500)
}

export async function generateBackupCodes(): Promise<BackupCodesResponse> {
    await delay(700)

    return {
        codes: [
            "A1B2-C3D4",
            "E5F6-G7H8",
            "I9J0-K1L2",
            "M3N4-O5P6",
            "Q7R8-S9T0",
        ],
    }
}
