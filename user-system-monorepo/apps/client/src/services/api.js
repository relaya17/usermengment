const API_BASE_URL = 'http://localhost:5000/api'; // כתובת השרת
function getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}
async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || response.statusText || 'שגיאה בשרת';
        throw new Error(errorMessage);
    }
    return response.json();
}
// רישום משתמש חדש עם תמונה (multipart/form-data)
export async function register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        body: userData,
    });
    return handleResponse(response);
}
// התחברות משתמש
export async function login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return handleResponse(response);
}
// קבלת פרטי המשתמש הנוכחי
export async function fetchCurrentUser() {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    // תיקון: פנה ל-/users/profile
    const response = await fetch(`${API_BASE_URL}/users/profile`, { headers });
    return handleResponse(response);
}
// יציאה מהמערכת
export async function logout() {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers,
    });
    if (!response.ok) {
        throw new Error('שגיאה בעת התנתקות');
    }
}
