import { compile } from 'handlebars';
import update from '../helpers/update';
import { 
  signup,
  login,
  logout,
  sendEmailVerification,
  sendNotification,
  requestNotificationPermission,
  storeUser,
  showUserInfo,
  showSignUp,
  showLogin,
  toggleMobileMenu,
  hideMobileMenu,
  addGenerallisteners,
  } from '../helpers/globalListeners.js';

// Import the template to use
const headerTemplate = require('../partials/header.handlebars');

export default () => {
  // Data to be passed to the template
  // Return the compiled template to the router
  addGenerallisteners();
  update(compile(headerTemplate));
};
