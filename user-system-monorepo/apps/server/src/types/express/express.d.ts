// user-system-monorepo/apps/server/src/types/express.d.ts

// 🆕 **תיקון הנתיב:**
// מייבא את IUserClient מהחבילה המשותפת (@shared)
// וודא ש-IUserClient מוגדר בנתיב זה בתוך packages/shared/src/types/userTypes.ts (או index.ts)
import { IUserClient } from '@shared/types/userTypes'; // נתיב נפוץ עבור טיפוסים משותפים

declare global {
  namespace Express {
    interface Request {
      user?: IUserClient;
      file?: Express.Multer.File; // אם מותקן multer וצריך טיפוס
    }
  }
}
