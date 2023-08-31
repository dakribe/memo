import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function verifyJwt(req: Request, res: Response, next: NextFunction) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'secret', (err: any, data: any) => {
        if (err) return res.sendStatus(403);

        req.user = data.user;

        next();
    });
}
