import { upload } from '../../middlewares/upload'; // הנתיב בהתאם לפרויקט שלך
import { Router } from 'express';
const router = Router();
// נקודת API להעלאת תמונת פרופיל
router.post('/upload-profile', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'לא התקבלה תמונה' });
    }
    // כאן אפשר לשמור את הקובץ או לשלוח תגובה מתאימה
    res.json({ message: 'התמונה התקבלה בהצלחה', file: req.file });
});
export default router;
