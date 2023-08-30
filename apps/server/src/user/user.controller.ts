import { Request, Response } from 'express';
import { createUser, getUser } from './user.service';
import { LoginSchema, RegisterUserData } from './user.schema';
import * as argon2 from 'argon2';

export async function signUp(req: Request, res: Response) {
    const { email, username, password } = req.body as RegisterUserData;

    const user = await getUser(email);

    if (user) {
        return res.status(401).json({ message: 'User already exists' });
    }

    const hashedPassword = await argon2.hash(password);

    const userData = {
        email,
        username,
        password: hashedPassword,
    };

    const newUser = await createUser(userData);

    return res.status(201).json(newUser);
}

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body as LoginSchema;

    const user = await getUser(email);

    if (!user) return res.status(401).json({ message: 'Invalid data' });

    const isMatch = await argon2.verify(user?.password, password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(201).json('Logged in');
}
