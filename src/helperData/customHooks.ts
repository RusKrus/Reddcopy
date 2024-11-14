import { RootState, AppDispatchType } from "../components/app/store";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

//custom hooks for TS react-redux 
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
