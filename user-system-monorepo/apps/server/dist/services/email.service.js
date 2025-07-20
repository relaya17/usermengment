import nodemailer from 'nodemailer'; // ייבוא ספריית nodemailer לשליחת מיילים
// הגדרות סודיות ל-JWT ו-URL של הלקוח
// חשוב: יש להגדיר משתני סביבה אלו בקובץ .env ולא כאן בקוד ישירות
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'; // כתובת ה-URL של צד הלקוח לאימות מייל
// יצירת ה-transporter עבור שליחת מיילים
// יש להחליף את host, port, user ו-pass בפרטי שרת ה-SMTP שלך
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com', // לדוגמה: 'smtp.gmail.com'
    port: parseInt(process.env.SMTP_PORT || '587', 10), // לדוגמה: 587 (TLS) או 465 (SSL)
    secure: process.env.SMTP_SECURE === 'true', // true עבור 465, false עבור 587
    auth: {
        user: process.env.SMTP_USER || 'your_email@example.com', // כתובת המייל שדרכה ישלחו המיילים
        pass: process.env.SMTP_PASS || 'your_email_password', // סיסמת המייל
    },
});
/**
 * פונקציה לשליחת מייל אימות למשתמש חדש.
 * @param email כתובת המייל של המשתמש.
 * @param token טוקן האימות הייחודי.
 */
export const sendVerificationEmail = async (email, token) => {
    try {
        const url = `${CLIENT_URL}/verify-email/${token}`; // יצירת קישור האימות
        const mailOptions = {
            from: `\"Your App\" <${process.env.SMTP_USER || 'your_email@example.com'}>`, // מאיזו כתובת המייל נשלח
            to: email, // למי המייל נשלח
            subject: 'אימות מייל - יש לאשר את המייל שלך', // נושא המייל
            html: `
                <p>שלום,</p>
                <p>אנא לחץ על הקישור הבא כדי לאמת את המייל שלך:</p>
                <a href="${url}">${url}</a>
                <p>הקישור תקף ל-24 שעות.</p>
                <p>בברכה,</p>
                <p>צוות ${process.env.APP_NAME || 'Your App'}</p>
            `, // תוכן המייל בפורמט HTML
        };
        // שליחת המייל
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    }
    catch (error) {
        console.error('Failed to send verification email:', error); // הדפסת שגיאה אם שליחת המייל נכשלה
        throw error; // זריקת השגיאה הלאה
    }
};
