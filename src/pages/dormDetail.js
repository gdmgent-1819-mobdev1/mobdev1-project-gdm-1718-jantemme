/* eslint-disable */
// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { userInfo } from 'os';
import {
  logout,
  addDorm,
  getImage,
  sendNotification,
  requestNotificationPermission,
  checkForUser,
  toggleMobileMenu,
  toggleFurnitureDiscription,
  hideMobileMenu,
  showLogout,
  hideLogout,
  addGenerallisteners,
  addAddDormListeners
  } from '../helpers/globalListeners.js';

  const { getInstance } = require('../firebase/firebase');

  const firebase = getInstance();

// Import the template to use
const dormDetailTemplate = require('../templates/dormDetail.handlebars');

export default () => {
  // Data to be passed to the template
  let loading = true;
  let dorm = {};
  // Return the compiled template to the router
  update(compile(dormDetailTemplate)({ loading, dorm }));

  const dorm_id = localStorage.getItem('dorm_id');

  const database = firebase.database().ref('/dorms');
  database.on('value', (snapshot) => {
    snapshot.forEach(function (data) {
      if (dorm_id == data.val().dorm_id) {
        dorm = data.val();
        console.log(data.val());
        loading = false;
      }
    });
    // Run the update helper to update the template
    update(compile(dormDetailTemplate)({ loading, dorm }));
    addGenerallisteners();
  });
}