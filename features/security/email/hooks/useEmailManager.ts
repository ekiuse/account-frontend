import { useState, useEffect } from "react";
import { Email } from "../models/email.model";
import { fetchEmails, addEmail, deleteEmail, makePrimaryEmail } from "../services/email.service";

export const useEmailManager = () => {
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchEmails().then((data) => {
            setEmails(data);
            setLoading(false);
        });
    }, []);

    const addNewEmail = async (email: Email) => {
        setLoading(true);
        const newEmail = await addEmail(email);
        setEmails((prev) => [...prev, newEmail]);
        setLoading(false);
    };

    const removeEmail = async (id: string) => {
        setLoading(true);
        await deleteEmail(id);
        setEmails((prev) => prev.filter((e) => e.id !== id));
        setLoading(false);
    };

    const setPrimary = async (id: string) => {
        setLoading(true);
        await makePrimaryEmail(id);
        setEmails((prev) =>
            prev.map((e) => ({ ...e, primary: e.id === id }))
        );
        setLoading(false);
    };

    return { emails, loading, addNewEmail, removeEmail, setPrimary };
};
