import { makeObservable, observable, action } from 'mobx';
import authService from '../models/AuthService';

class AuthViewModel {
  token = null;
  error = null;
  loading = false;
  passwordChangeRequired = false;

  constructor() {
    makeObservable(this, {
      token: observable,
      error: observable,
      loading: observable,
      passwordChangeRequired: observable,
      login: action,
      changePassword: action,
      logout: action
    });
  }

  async login(email, password) {
    this.loading = true;
    this.error = null;
    
    try {
      const response = await authService.login(email, password);
      this.token = response.token;
      
      // Check if password needs to be changed
      const decoded = jwtDecode(this.token);
      this.passwordChangeRequired = decoded.tempPassword;
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async changePassword(currentPassword, newPassword) {
    this.loading = true;
    this.error = null;
    
    try {
      await authService.changePassword(this.token, currentPassword, newPassword);
      this.passwordChangeRequired = false;
      this.logout(); // Force re-login after password change
      return true;
    } catch (err) {
      this.error = err.message;
      return false;
    } finally {
      this.loading = false;
    }
  }

  logout() {
    this.token = null;
    this.error = null;
    this.loading = false;
  }
}

export default AuthViewModel;