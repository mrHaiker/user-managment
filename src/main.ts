import { User } from './app/app.component'

function component() {
  let element = document.createElement('div');
  console.log('test 123');

  element.innerHTML = User;

  return element;
}

document.body.appendChild(component());
