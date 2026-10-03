// What the app keeps in memory and in the session. Never includes credentials.
export interface SessionUser {
    id: string;
    email: string;
    name: string;
}

// What is persisted in the users table, including the password hash.
export interface StoredUser extends SessionUser {
    salt: string;
    hash: string;
}
