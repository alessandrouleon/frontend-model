export const ROLES = {
    ADMIN: 'ADMIN',
    CLIENT_ADMIN: 'CLIENT_ADMIN',
    USER: 'USER',
    MANAGER: 'MANAGER',
    GUEST: 'GUEST'
};

export type Roles = typeof ROLES[keyof typeof ROLES];
