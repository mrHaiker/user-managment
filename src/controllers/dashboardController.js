Controllers.dashboard = class {
  constructor({ firebase, loader }) {
    this.loader = loader;
    this.firebase = firebase;

    this.db = this.firebase.database;

    this.loader.show();
    this.checkIsLogin()
      .then(() => this.loader.hide())
      .then(() => this.getUsers())
      .catch(err => console.log('dasboard err', err))
  }

  checkIsLogin() {
    return new Promise((resolve, reject) => {
      this.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user)
        } else {
          reject('need redirect to login page')
        }
      });
    })
  }

  getUsers() {
    // this.writeUserData(1, 'Sergey', 'test@test.com')
    this.db().ref('users/').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        console.log('childSnapshot',
          childSnapshot.key,
          childSnapshot.val()
        )
      });
    })
  }


  addNewUser(userId, name, email) {
    this.db().ref('users/').push({
      username: name,
      email: email
    });
  }
};


