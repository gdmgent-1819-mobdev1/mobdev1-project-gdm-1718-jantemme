/* eslint-disable */
// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';

// Import the update helper
import update from '../helpers/update';
import {
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
  showLogout,
  hideLogout,
  hideLoginSignUp,
  addGenerallisteners
  } from '../helpers/globalListeners.js';

const { getInstance } = require('../firebase/firebase');

const firebase = getInstance();
// Import the template to use
const aboutTemplate = require('../templates/dorms.handlebars');

export default () => {
  // Data to be passed to the template
  let loading = true;
  let posts = {};
  let image;
  const title = 'Dorms';
  // Return the compiled template to the router
  update(compile(aboutTemplate)({ title, loading, posts }));

  /*if (firebase) {
    // firebase.auth().createUserWithEmailAndPassword('test@test.com', 'test333').catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode,errorMessage);
    //   });

    /*const database = firebase.database().ref('/dorms');
    database.on('value', (snapshot) => {
      posts = snapshot.val();
      console.log(snapshot.val());
      loading = false;
      // Run the update helper to update the template
      update(compile(aboutTemplate)({ title, loading, posts }));
    });
  }*/

  fetch('https://datatank.stad.gent/4/wonen/kotatgent.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    posts = myJson;
    loading = false;
    console.log(JSON.stringify(myJson));
    update(compile(aboutTemplate)({ title, loading, posts }));
    addGenerallisteners();
  });

  console.log('end');

};
