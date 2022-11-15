import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../shared/store/store";

// Use throughout your app instead of plain `useDispatch` and `useAppSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
