/* eslint-disable */
// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { userInfo } from 'os';
import {
  login,
  logout,
  sendEmailVerification,
  sendNotification,
  requestNotificationPermission,
  storeUser,
  checkForUser,
  showUserInfo,
  toggleMobileMenu,
  hideMobileMenu,
  showLogout,
  hideLogout,
  addGenerallisteners,
  addLoginListeners
  } from '../helpers/globalListeners.js';

// Import the template to use
const loginTemplate = require('../templates/login.handlebars');

export default () => {
  // Data to be passed to the template
  // Return the compiled template to the router
  update(compile(loginTemplate)());
  addGenerallisteners();
  addLoginListeners();
};
