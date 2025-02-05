import { LanguageEnum, StorageKeys, ThemeEnum } from '../../enums';

export interface HeaderState {
  theme: ThemeEnum;
  language: LanguageEnum;
  isAuthenticated: boolean;
}

export const initialHeaderState: HeaderState = {
  theme: (localStorage.getItem(StorageKeys.Theme) as ThemeEnum) || ThemeEnum.Light,
  language: (localStorage.getItem(StorageKeys.Language) as LanguageEnum) || LanguageEnum.English,
  isAuthenticated: false,
}
