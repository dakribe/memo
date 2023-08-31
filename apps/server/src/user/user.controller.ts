import { Request, Response } from 'express';
import { createUser, getUser } from './user.service';
import { LoginSchema, RegisterUserData } from './user.schema';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

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

    const accessToken = jwt.sign(
        {
            user: {
                email: newUser.email,
                username: newUser.username,
            },
        },
        // TODO: Update secret
        'secret',
    );

    return res.status(201).json({
        accessToken,
        user: {
            email: newUser.email,
            username: newUser.username,
        },
    });
}

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body as LoginSchema;

    const user = await getUser(email);

    if (!user) return res.status(401).json({ message: 'Invalid data' });

    const isMatch = await argon2.verify(user?.password, password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const accessToken = jwt.sign(
        {
            user: {
                email: user.email,
                username: user.username,
            },
        },
        'secret',
    );

    res.cookie('token', accessToken);

    return res.status(201).json({
        accessToken,
        user: {
            email: user.email,
            username: user.username,
        },
    });
}
