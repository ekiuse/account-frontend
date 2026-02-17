import { Phone } from "../models/phone.model";
import { phonesMock } from "../mocks/phone.mock";

export const fetchPhones = async (): Promise<Phone[]> =>
    new Promise((res) => setTimeout(() => res([...phonesMock]), 300));

export const addPhone = async (newPhone: Phone): Promise<Phone> => {
    phonesMock.push(newPhone);
    return new Promise((res) => setTimeout(() => res(newPhone), 300));
};

export const deletePhone = async (id: string): Promise<void> => {
    const index = phonesMock.findIndex((p) => p.id === id);
    if (index !== -1) phonesMock.splice(index, 1);
    return new Promise((res) => setTimeout(() => res(), 300));
};

export const makePrimaryPhone = async (id: string): Promise<void> => {
    phonesMock.forEach((p) => (p.primary = p.id === id));
    return new Promise((res) => setTimeout(() => res(), 300));
};
