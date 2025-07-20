import { Request, Response } from 'express';
import { IRegisterData } from '@shared/types/userTypes';
export declare const registerUserWithImage: (req: Request<unknown, unknown, IRegisterData>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyEmail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllUsers: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUserById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const promoteToAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUserProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map