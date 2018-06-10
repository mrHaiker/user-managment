class Loader {
  constructor() {
  }

  get elem() {
    return document.getElementsByClassName('loader-wrap')[0];
  }

  show() {
    this.elem.style.display = 'flex';
  }

  hide() {
    this.elem.style.display = 'none';
  }
}

Services.loader = new Loader();