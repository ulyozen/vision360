import { HeaderState } from './core/store/header/header.state';
import { AuthState } from './features/auth/store/auth.state';

export interface AppState {
  header: HeaderState
  auth: AuthState
}
