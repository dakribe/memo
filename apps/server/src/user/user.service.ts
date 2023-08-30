import db from '../utils/db';
import { RegisterUserData } from './user.schema';

export async function createUser(data: RegisterUserData) {
    return await db.user.create({
        data: {
            email: data.email,
            username: data.username,
            password: data.password,
        },
    });
}

export async function getUser(email: string) {
    try {
        return await db.user.findUnique({
            where: {
                email: email,
            },
        });
    } catch (e) {
        throw new Error('User with email already exists');
    }
}
