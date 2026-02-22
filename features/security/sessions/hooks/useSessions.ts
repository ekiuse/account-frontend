import { useEffect, useState } from "react";
import {
    fetchSessions,
    terminateSession as terminateSessionService,
    terminateAllOtherSessions,
} from "../services/session.service";
import { Session } from "../models/session.model";

export const useSessions = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

    const loadSessions = async () => {
        setLoading(true);
        const data = await fetchSessions();
        setSessions(data);
        setLoading(false);
    };

    const terminate = async (id: string) => {
        await terminateSessionService(id);
        await loadSessions();
    };

    const terminateAll = async () => {
        await terminateAllOtherSessions();
        await loadSessions();
    };

    useEffect(() => {
        loadSessions();
    }, []);

    return {
        sessions,
        loading,
        terminate,
        terminateAll,
    };
};