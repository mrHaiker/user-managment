Controllers.dashboard = class {

  constructor({ firebase, loader }) {
    this.loader = loader;
    this.firebase = firebase;

    this.db = this.firebase.database;

    this.loader.show();
    this.checkIsLogin()
      .then(() => this.getUsers())
      .then(() => this.loader.hide())
      .catch(err => console.log('dasboard err', err));
  }

  get groupList() {
    return document.getElementsByClassName('list-group')[0];
  }
  get listItems() {
    return document.getElementsByClassName('list-group-item')
  }

  checkIsLogin() {
    return new Promise((resolve, reject) => {
      this.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user)
        } else {
          reject('Redirect to login page');
          location.hash = `#/login`;
          this.loader.hide();
        }
      });
    })
  }

  getUsers() {
    return this.db().ref('users/').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let id = childSnapshot.key;
        this.groupList.innerHTML += this.createListItem(id, childSnapshot.val());
      });
    });
  }

  showUser(id) {
    location.hash = `#/user?id=${id}`;
  }


  createListItem(id, {username, email}) {
    return `
      <li class="list-group-item" onclick="dashboard.showUser('${id}')">
        <div class="item-name">${username}</div>
        <div class="item-email">${email}</div>
        <div class="item-edit">
          <i class="fas fa-pencil-alt"></i>
        </div>
      </li>
    `
  }

  logout() {
    this.firebase.auth().signOut().then(() => {
      location.hash = `#/login`;
    });

    return false;
  }
};


