"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
    qrCode: string
    manualKey: string | null
    onComplete: () => void
    onCancel: () => void
}

export function AuthenticatorSetup({ qrCode, manualKey, onComplete, onCancel }: Props) {
    return (
        <Dialog open onOpenChange={onCancel}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Set up Authenticator App</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <p className="text-sm">Scan the QR code below with your authenticator app:</p>
                    <img src={qrCode} alt="QR Code" className="w-40 h-40 mx-auto" />
                    {manualKey && <p className="text-sm text-muted-foreground text-center">Or use this key: {manualKey}</p>}

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                        <Button onClick={onComplete}>Complete</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
