"use client"

import { Button } from "@/components/ui/button"

type Props = {
    codes: string[]
    onComplete: () => void
    refresh: () => void
}

export function BackupCodes({ codes, onComplete, refresh }: Props) {
    const downloadCodes = () => {
        const blob = new Blob([codes.join("\n")], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "backup-codes.txt"
        a.click()
    }

    return (
        <div className="space-y-4 p-4">
            <h3 className="text-lg font-semibold">Backup Codes</h3>
            <p className="text-sm text-muted-foreground">
                Use these codes if you lose access to your authenticator app.
            </p>

            <div className="flex gap-2">
                <Button onClick={refresh}>Generate New Codes</Button>
                <Button onClick={downloadCodes} disabled={!codes.length}>Download</Button>
            </div>

            {codes.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-3">
                    {codes.map((c, i) => (
                        <div key={i} className="font-mono text-sm p-2 border rounded bg-gray-100 text-black">
                            {c}
                        </div>
                    ))}
                </div>
            )}

            <Button className="mt-4" onClick={onComplete}>Complete Verification</Button>
        </div>
    )
}
