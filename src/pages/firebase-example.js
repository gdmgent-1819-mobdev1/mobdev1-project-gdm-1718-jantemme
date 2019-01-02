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
  toggleMobileMenu,
  hideMobileMenu,
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
  const title = 'Dorms';
  // Return the compiled template to the router
  update(compile(aboutTemplate)({ title, loading, posts }));

    const database = firebase.database().ref('/dorms');
    database.on('value', (snapshot) => {
      posts = snapshot.val();
      console.log(snapshot.val());
      loading = false;
      // Run the update helper to update the template
      update(compile(aboutTemplate)({ title, loading, posts }));

      const dorms = document.querySelectorAll("div.dorm");
      for (var i = 0; i < dorms.length; i++) {
          dorms[i].addEventListener('click',redirect,false);
      }
      function redirect(e){
        const dorm_id = e.currentTarget.getAttribute('id');
        console.log(dorm_id);
        localStorage.setItem('dorm_id', dorm_id);
        window.location.assign('#/dormDetail')
      }

      addGenerallisteners();
    });
  }

  /*fetch('https://datatank.stad.gent/4/wonen/kotatgent.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    posts = myJson;
    loading = false;
    update(compile(aboutTemplate)({ title, loading, posts }));
    addGenerallisteners();
  });

};*/
