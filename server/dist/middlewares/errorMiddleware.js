export const errorHandler = (err, req, res, next) => {
    console.error('🛑 שגיאה:', err.message);
    const statusCode = err.statusCode ?? 500;
    const message = err.message ?? 'שגיאה פנימית בשרת';
    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
