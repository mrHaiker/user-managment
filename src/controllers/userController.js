Controllers.user = class {
  constructor({ router, firebase, loader }) {
    this.router = router;
    this.firebase = firebase;
    this.loader = loader;

    this.db = this.firebase.database;

    router ? this.renderUser() : null;
  }

  get userForm() {
    return document.getElementById('user');
  }

  addNewUser(form) {
    return this.db().ref('users/').push({
      username: form.username.value,
      email: form.email.value,
      age: form.age.value
    });
  }

  renderUser() {
    this.loader.show();
    const id = this.router.params.id;
    this.db().ref('/users/' + id).once('value').then((snapshot) =>  {
      const params = snapshot.val();
      this.userForm.username.value = params.username;
      this.userForm.email.value = params.email;
      this.userForm.age.value = params.age;
      this.loader.hide();
    });
  }

  redirect() {
    location.hash = '#/dashboard';
  }

  save() {
    this.loader.show();
    Promise.resolve(this.userForm)
      .then(this.validate)
      .then((data) => this.router ? this.updateUser(data) : this.addNewUser(data))
      .then(this.redirect)
      .catch(err => {
        this.loader.hide();
        this.writeError(err);
      })
    ; 
  }
  
  validate(form) {
    if (form.username.value.length < 3) {
      throw 'User name shout be more than 3 symbols'
    } else if (form.email.value.length < 5) {
      throw 'Invalid email'
    } else if (form.age.value <= 0 || form.age.value > 120) {
      throw 'Invalid age'
    }
    
    return form;
  }
  
  updateUser(form) {
    const id = this.router.params.id;
    return this.db().ref('/users/' + id).set({
     username: form.username.value,
     email: form.email.value,
     age: form.age.value
    })
  }

  remove() {
    const id = this.router.params.id;
    this.db().ref('/users/' + id).remove().then(() => {
      location.hash = `#/dashboard`;
    })
  }

  writeError(err = '') {
    document.getElementById('error-log').innerText = err;
  }

  logout() {
    this.firebase.auth().signOut().then(() => {
      location.hash = `#/login`;
    });

    return false;
  }
};
