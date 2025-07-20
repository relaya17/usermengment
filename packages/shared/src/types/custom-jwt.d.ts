// packages/shared/src/types/custom-jwt.d.ts
import 'jsonwebtoken';
import { IJwtPayload } from './auth';

declare module 'jsonwebtoken' {
    export interface JwtPayload extends IJwtPayload {
        // שדות סטנדרטיים של JWT כמו 'iat', 'exp', 'aud' וכו' מוספים אוטומטית.
        // אין צורך להגדיר כאן userId, isAdmin, isBusiness אם הם כבר מטופלים על ידי 'id' ו-'role' ב-IJwtPayload.
    }
}
