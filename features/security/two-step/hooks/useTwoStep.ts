"use client"

import { useState } from "react"
import {
    generateAuthenticatorSetup,
    verifyAuthenticatorCode,
    disableTwoStep,
    generateBackupCodes,
} from "../services/twoStep.services"

export type TwoStepMethod =
    | "email"
    | "sms"
    | "backupCodes"
    | "authenticator"

type MethodStatus = "idle" | "enabled" | "verified"

export function useTwoStep() {
    const [isEnabled, setIsEnabled] = useState(false)
    const [methods, setMethods] = useState<
        Record<TwoStepMethod, MethodStatus>
    >({
        email: "idle",
        sms: "idle",
        backupCodes: "idle",
        authenticator: "idle",
    })

    const [secret, setSecret] = useState<string | null>(null)
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
    const [backupCodes, setBackupCodes] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const startAuthenticatorSetup = async (email: string) => {
        setIsLoading(true)
        setError(null)

        try {
            const res = await generateAuthenticatorSetup(email)
            setSecret(res.secret)
            setQrCodeUrl(res.qrCodeUrl)
            setMethods((p) => ({ ...p, authenticator: "enabled" }))
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const verifyMethod = async (
        method: TwoStepMethod,
        code?: string
    ) => {
        setIsLoading(true)
        setError(null)

        try {
            if (method === "authenticator") {
                if (!secret) throw new Error("Missing secret")
                await verifyAuthenticatorCode(code!, secret)
            }

            if (method === "backupCodes") {
                const res = await generateBackupCodes()
                setBackupCodes(res.codes)
            }

            setMethods((p) => ({
                ...p,
                [method]: "verified",
            }))
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const activate = () => {
        const verifiedCount = Object.values(methods).filter(
            (v) => v === "verified"
        ).length

        if (verifiedCount < 3) return

        setIsEnabled(true)
    }

    const turnOff = async () => {
        await disableTwoStep()
        setIsEnabled(false)
    }

    return {
        isEnabled,
        methods,
        qrCodeUrl,
        secret,
        backupCodes,
        error,
        isLoading,
        startAuthenticatorSetup,
        verifyMethod,
        activate,
        turnOff,
    }
}