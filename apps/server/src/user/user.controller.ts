import { Request, Response } from 'express';
import { createUser } from './user.service';
import { RegisterUserData } from './user.schema';

export async function signUp(req: Request, res: Response) {
    const data = req.body as RegisterUserData;
    const user = await createUser(data);

    return res.status(201).json(user);
}

export async function signIn(req: Request, res: Response) {}
