import { IUserClient } from 'apps/client/shared/src';

declare global {
  namespace Express {
    interface Request {
      user?: IUserClient;
      file?: Express.Multer.File; // אם מותקן multer וצריך טיפוס
    }
  }
}
