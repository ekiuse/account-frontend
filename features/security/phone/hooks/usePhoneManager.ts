import { useState, useEffect } from "react";
import { Phone } from "../models/phone.model";
import { fetchPhones, addPhone, deletePhone, makePrimaryPhone } from "../services/phone.services";

export const usePhoneManager = () => {
    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchPhones().then((data) => {
            setPhones(data);
            setLoading(false);
        });
    }, []);

    const addNewPhone = async (phone: Phone) => {
        setLoading(true);
        const newPhone = await addPhone(phone);
        setPhones((prev) => [...prev, newPhone]);
        setLoading(false);
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

    return { phones, loading, addNewPhone, removePhone, setPrimary };
};
