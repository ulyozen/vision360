import { ThemeEnum } from '../../enums/Theme';
import { LanguageEnum } from '../../enums/Language';

export interface HeaderState {
  theme: ThemeEnum;
  language: LanguageEnum;
  isAuthenticated: boolean;
}

export const initialHeaderState: HeaderState = {
  theme: ThemeEnum.Light,
  language: LanguageEnum.English,
  isAuthenticated: false,
}
