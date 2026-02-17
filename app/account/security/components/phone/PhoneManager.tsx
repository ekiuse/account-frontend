"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePhoneManager } from "@/features/security/phone/hooks/usePhoneManager";

export function PhoneManager() {
    const { phones, loading, addNewPhone, removePhone, setPrimary } = usePhoneManager();
    const [newPhone, setNewPhone] = useState("");

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Phone Numbers</h2>
            </div>

            <div className="space-y-2">
                {phones.map((p) => (
                    <div key={p.id} className="border rounded-lg p-3 flex justify-between items-center">
                        <div>
                            <p className="font-medium">{p.number}</p>
                            <div className="text-sm text-gray-500">
                                {p.primary ? "Primary" : p.verified ? "Verified" : "Pending verification"}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {!p.primary && (
                                <Button size="sm" variant="outline" onClick={() => setPrimary(p.id)}>
                                    Make Primary
                                </Button>
                            )}
                            {!p.primary && (
                                <Button size="sm" variant="destructive" onClick={() => removePhone(p.id)}>
                                    Remove
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Add new phone"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="border p-2 rounded flex-1"
                />
                <Button
                    onClick={() => {
                        addNewPhone({
                            id: Date.now().toString(),
                            number: newPhone,
                            primary: false,
                            verified: false,
                        });
                        setNewPhone("");
                    }}
                    disabled={!newPhone || loading}
                >
                    Add
                </Button>
            </div>
        </div>
    );
}
