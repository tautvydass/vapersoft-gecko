import { Role } from './enums/role';

export interface User {
    id: number;
    fullname: string;
    email: string;
    role: Role;
}
