Controllers.login = class {
  constructor() {
  }

  submit(el, page) {
    Promise.resolve(el)
      .then(this.validate)
      .then(page === 'login' ? this.login : this.register)
      .then(this.clearError)
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

  login () {
    console.log('try to login');
  }

  register () {
    console.log('try to register user');
  }

  clearError() {
    this.writeError();
  }

  writeError(err = '') {
    document.getElementById('error-log').innerText = err;
  }
};