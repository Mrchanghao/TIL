// console.log('start project')
const { hash } = window.location;
// console.log(atob(hash.replace('#', '')))

const message = atob(hash.replace("#", ''));

if (message) {
  document.querySelector('#message-form').classList.add('hide');
  document.querySelector('#message-show').classList.remove('hide');
  document.querySelector('h1').innerHTML = message;
}

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  
  const input = document.querySelector('#message-input')
  document.querySelector('#message-form').classList.add('hide');
  document.querySelector('#link-form').classList.remove('hide');
  const encrypted = btoa(input.value);
  // console.log(input.value);
  const linkInput = document.querySelector('#link-input')
  linkInput.value = `${window.location}#${encrypted}`;
  // domain/path/?color=red#value 
              //   query /  hash
  linkInput.select();
      



})