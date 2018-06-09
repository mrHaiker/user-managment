class LoginController {
  constructor(firebase) {
  }



  submit(el) {
    Promise.resolve(el)
      .then(this.validete)
      .then(this.login)
      .then(this.clearError)
      .catch(this.writeError);

    return false;
  }

  validete(el) {
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

  clearError() {
    this.writeError();
  }

  writeError(err = '') {
    document.getElementById('error-log').innerText = err;
  }
}

let auth = new LoginController(firebase);