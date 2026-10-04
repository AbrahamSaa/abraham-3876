import { storage, type LoginFormValues, type SignupFormValues } from "@snail/shared"
import { SESSION_KEY, STORED_USERS_KEY } from "../constants/storage-keys"
import type { SessionUser, StoredUser } from "../types/user"
import { hashPassword, verifyPassword } from "./passwordHasher"

const EMAIL_TAKEN_MESSAGE = "El correo electronico que intentas ingresar ya esta registrado inicia sesión o crea uno nuevo"
const EMPTY_PASSWORD_MESSAGE = "La contraseña no puede estar vacía"
const INVALID_CREDENTIALS_MESSAGE = "Usuario o contraseña incorrecto, vuelva intentarlo"

const normalizeEmail = (email: string) => email.trim().toLowerCase()

const getUsers = (): StoredUser[] => storage.get<StoredUser[]>(STORED_USERS_KEY) ?? []

const getUserByEmail = (email: string): StoredUser | undefined => {
    const normalized = normalizeEmail(email)
    return getUsers().find((user) => normalizeEmail(user.email) === normalized)
}

const toSessionUser = ({ id, email, name }: StoredUser): SessionUser => ({ id, email, name })

export const getStoredSession = (): SessionUser | null => {
    const session = storage.get<SessionUser>(SESSION_KEY)
    // Sessions saved by older versions also contain the hash and salt, so only keep the public fields.
    return session && toSessionUser(session as StoredUser)
}

export const clearSession = () => storage.remove(SESSION_KEY)

export const signup = async (values: SignupFormValues) => {
    if (getUserByEmail(values.email) !== undefined) {
        throw new Error(EMAIL_TAKEN_MESSAGE)
    }

    const hashed = await hashPassword(values.password)
    if (hashed === null) {
        throw new Error(EMPTY_PASSWORD_MESSAGE)
    }

    const { hash, salt } = hashed
    const user: StoredUser = {
        id: crypto.randomUUID(),
        email: normalizeEmail(values.email),
        name: values.name,
        hash,
        salt,
    }
    storage.set(STORED_USERS_KEY, [...getUsers(), user])
}

export const login = async (values: LoginFormValues): Promise<SessionUser> => {
    const user = getUserByEmail(values.email)
    if (user === undefined) {
        throw new Error(INVALID_CREDENTIALS_MESSAGE)
    }

    const isValid = await verifyPassword(values.password, user.salt, user.hash)
    if (!isValid) {
        throw new Error(INVALID_CREDENTIALS_MESSAGE)
    }

    const sessionUser = toSessionUser(user)
    storage.set(SESSION_KEY, sessionUser)
    return sessionUser
}
