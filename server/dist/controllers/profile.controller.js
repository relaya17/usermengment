import { User } from '../models/User';
export const getProfile = async (req, res) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({ message: 'לא מחובר' });
        }
        const user = await User.findById(req.user._id).select('-passwordHash -verificationToken');
        if (!user)
            return res.status(404).json({ message: 'משתמש לא נמצא' });
        res.json(user);
    }
    catch (err) {
        console.error('שגיאה בקבלת פרופיל:', err);
        res.status(500).json({ message: 'שגיאה בקבלת פרופיל המשתמש' });
    }
};
export const updateProfile = async (req, res) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({ message: 'לא מחובר' });
        }
        const allowedFields = ['name', 'phone', 'imagePath'];
        const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowedFields.includes(key)));
        const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true })
            .select('-passwordHash -verificationToken');
        if (!user)
            return res.status(404).json({ message: 'משתמש לא נמצא' });
        res.json(user);
    }
    catch (err) {
        console.error('שגיאה בעדכון פרופיל:', err);
        res.status(500).json({ message: 'שגיאה בעדכון פרופיל המשתמש' });
    }
};
