import { Output, object, string } from 'valibot';

const RegisterUserSchema = object({
    email: string(),
    username: string(),
    password: string(),
});

export type RegisterUserData = Output<typeof RegisterUserSchema>;

const LoginSchema = object({
    email: string(),
    password: string(),
});

export type LoginSchema = Output<typeof LoginSchema>;
