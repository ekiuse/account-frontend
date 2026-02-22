import { useState, useEffect } from "react";
import { Phone } from "../models/phone.model";
import {
    fetchPhones,
    addPhone,
    deletePhone,
    makePrimaryPhone,
    sendVerificationCode,
} from "../services/phone.services";

export const usePhoneManager = () => {
    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState(false);

    const [pendingNumber, setPendingNumber] = useState<string | null>(null);
    const [verificationCode, setVerificationCode] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchPhones().then((data) => {
            setPhones(data);
            setLoading(false);
        });
    }, []);


    const startPhoneVerification = async (number: string) => {
        setLoading(true);

        const code = await sendVerificationCode(number);

        setPendingNumber(number);
        setVerificationCode(code);

        setLoading(false);
    };

    const confirmPhone = async (code: string) => {
        if (!pendingNumber || !verificationCode) return false;

        if (code !== verificationCode) {
            return false;
        }

        const newPhone: Phone = {
            id: Date.now().toString(),
            number: pendingNumber,
            primary: false,
            verified: true,
        };

        const saved = await addPhone(newPhone);

        setPhones((prev) => [...prev, saved]);
        setPendingNumber(null);
        setVerificationCode(null);

        return true;
    };

    const removePhone = async (id: string) => {
        setLoading(true);
        await deletePhone(id);
        setPhones((prev) => prev.filter((p) => p.id !== id));
        setLoading(false);
    };

    const setPrimary = async (id: string) => {
        setLoading(true);
        await makePrimaryPhone(id);
        setPhones((prev) =>
            prev.map((p) => ({ ...p, primary: p.id === id }))
        );
        setLoading(false);
    };

    return {
        phones,
        loading,
        removePhone,
        setPrimary,
        startPhoneVerification,
        confirmPhone,
        pendingNumber,
    };
};