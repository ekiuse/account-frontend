"use client"

import { useState } from "react"

// Fake API fns
import {
    enableTwoStep,
    verifyTwoStepCode,
    disableTwoStep,
    generateBackupCodes,
} from "./servies"

export type TwoStepMethod = "authenticator" | "backupCodes" | "email" | "sms"

export function useTwoStep() {
    const [isEnabled, setIsEnabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
    const [manualKey, setManualKey] = useState<string | null>(null)
    const [backupCodes, setBackupCodes] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)

    const [methodsEnabled, setMethodsEnabled] = useState<Record<TwoStepMethod, boolean>>({
        authenticator: false,
        backupCodes: false,
        email: false,
        sms: false,
    })

    // setup with selected methods
    const setupTwoStep = async (selectedMethods: Partial<Record<TwoStepMethod, boolean>>) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await enableTwoStep()
            setQrCodeUrl(res.qrCodeUrl)
            setManualKey(res.manualKey)
            setMethodsEnabled(prev => ({ ...prev, ...selectedMethods }))
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const confirmCode = async (method: TwoStepMethod, code: string) => {
        setIsLoading(true)
        setError(null)
        try {
            await verifyTwoStepCode(method, code)
            setMethodsEnabled(prev => ({ ...prev, [method]: true }))

            // check if at least 3 methods verified (sms optional)
            const verifiedMethods = Object.entries(methodsEnabled)
                .filter(([key, val]) => val && key !== "sms")
            if (verifiedMethods.length >= 3) {
                setIsEnabled(true)
                setQrCodeUrl(null)
                setManualKey(null)
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const turnOffTwoStep = async () => {
        setIsLoading(true)
        setError(null)
        try {
            await disableTwoStep()
            setIsEnabled(false)
            setBackupCodes([])
            setMethodsEnabled({
                authenticator: false,
                backupCodes: false,
                email: false,
                sms: false,
            })
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const refreshBackupCodes = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await generateBackupCodes()
            setBackupCodes(res.codes)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isEnabled,
        isLoading,
        qrCodeUrl,
        manualKey,
        backupCodes,
        error,
        methodsEnabled,
        setupTwoStep,
        confirmCode,
        turnOffTwoStep,
        refreshBackupCodes,
    }
}
