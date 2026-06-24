// store/selectors.ts
import defaultAvatar from '../assets/student-avatar-cropped.png';
import type { RootState } from "./index";

export const getUserNameSelector = (state: RootState) => state.user.username;
export const getUserRoleSelector = (state: RootState) => state.user.role;
export const getUserTokenSelector = (state: RootState) => state.user.token;
export const getIsAuthSelector = (state: RootState) => state.user.isAuth;
export const getDefaultAvatarSelector = (_state: RootState) => defaultAvatar; //_deliberateUnused