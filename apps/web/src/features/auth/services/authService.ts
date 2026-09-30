import type { LoginFormValues, SignupFormValues } from "@snail/shared";
import { hashPassword, verifyPassword } from "./passwordHasher";
import { storage } from '@snail/shared';
import { type User } from '@/src/features/auth/interfaces/user.interface';

const STORED_USER = "snail:users";
export const SESSION = "snail:session";

const getUsers = (): User[] => storage.get<User[]>(STORED_USER) ?? [];

const getUserByEmail = (email: string): User | undefined => {
    const users = getUsers();

    return users.find((user) => user.email === email);
};

export const signup = async (values: SignupFormValues) => {
    try {
        if (getUserByEmail(values.email) !== undefined) {
            throw Error("El correo electronico que intentas ingresar ya esta registrado inicia sesión o crea uno nuevo");
        }
        const { hash, salt } = await hashPassword(values.password);
        const user: User = {
            email: values.email,
            name: values.name,
            hash,
            salt,
            id: crypto.randomUUID(),
        };
        storage.set(STORED_USER, [...getUsers(), user]);

    } catch (e) {
        throw e;
    }
}

export const login = async (values: LoginFormValues) => {
    try {
        const user = getUserByEmail(values.email);
        if (user === undefined) {
            throw Error("Usuario o contraseña incorrecto, vuelva intentarlo");
        }

        const isValid = await verifyPassword(values.password, user.salt, user.hash);

        if (!isValid) {
            throw Error("Usuario o contraseña incorrecto, vuelva intentarlo");
        }
        storage.set(SESSION, user);
        return user;

    } catch (e) {
        throw e;
    }
}

