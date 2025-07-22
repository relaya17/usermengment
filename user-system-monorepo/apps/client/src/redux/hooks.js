// src/redux/hooks.ts
import { useSelector, useDispatch } from 'react-redux';
// Typed hooks`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
