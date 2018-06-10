Controllers.login = class {
  constructor({ filrebase }) {
  }

  submit(el, page) {
    Promise.resolve(el)
      .then(this.validate)
      .then(page === 'login' ? this.login : this.register)
      .then(() => this.clearError())
      .then(this.redirect)
      .catch(this.writeError);

    return false;
  }

  validate(el) {
    if (el.pass.value.length < 6) {
      throw 'Password should be 6 or more symbols';
    } else if (!el.email.value.length) {
      throw 'Email is required';
    }

    return el;
  }

  login (el) {
    return firebase.auth().signInWithEmailAndPassword(el.email.value, el.pass.value)
  }

  register (el) {
    return firebase.auth().createUserWithEmailAndPassword(el.email.value, el.pass.value);
  }
  
  redirect() {
    console.log('locationHashDasboard', location.hash = '#/dashboard')
  }

  clearError() {
    console.log('this', this);
    this.writeError();
  }

  writeError(err = '') {
    document.getElementById('error-log').innerText = err;
  }
};