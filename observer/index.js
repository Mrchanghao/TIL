let redoValue, undoValue;


const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');

const addButton = document.querySelector('.add');
const connectButton = document.querySelector('.connect');
const disconnectButton = document.querySelector('.disconnect');

// observer target 
const target = document.querySelector('ol');
const inputTarget = document.querySelector('.editContent');

const config = {
  childList: true
}


const Observer = new MutationObserver((mutationRecords) => {
  console.log(mutationRecords);

  mutationRecords.map((record) => {
    
    if(record.target.className === 'editContent') {
      if (record.addedNodes.length !== 0 && record.removedNodes.length !== 0) {
        Array.from(record.removedNodes).map((removedNode) => redoValue = removedNode.textContent)
      } else if (record.addedNodes.length !== 0) {
        redoValue = undefined;
      } else if (record.removedNodes.length !== 0) {
        Array.from(record.removedNodes).map(removedNode => undoValue = removedNode.textContent)
      }
    }

    if (record.target === 'ol') {
      if (record.removedNodes.length > 0 ) {
        undoValue = record.removedNodes[0].textContent;
        inputTarget.textContent = undoValue;
      } else {
        redoValue = record.addedNodes[0].textContent;
      }
    }

  })
})


let add = () => {
  let li = document.createElement('li');
  let value = inputTarget.textContent;

  li.textContent = value;
  target.append(li);
  inputTarget.textContent = '';

  inputTarget.focus();
  if (target.querySelector('li') !== undefined) {
    undoButton.classList.remove('disabled');
  } else {
    undoButton.classList.add('disabled');
    redoButton.classList.add('disabled');
  }
  addButton.classList.add('disabled');
}

inputTarget.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    add();
  }
  inputTarget.textContent === '' ? addButton.classList.add('disabled') : addButton.classList.remove('disabled');
});

let undo = () => {
  redoButton.classList.remove('disabled');
  if(target.querySelectorAll('li')[target.querySelectorAll('li').length - 1]) {
    undoValue = target.querySelectorAll('li')[target.querySelectorAll('li').length - 1].textContent;
    target.querySelectorAll('li')[target.querySelectorAll('li').length - 1].remove();
  } else {
    inputTarget.textContent = '';
  }

  inputTarget.textContent = undoValue ? undoValue : inputTarget.textContent;
  target.querySelectorAll('li').length === 0 ? undoButton.classList.add('disabled') : 0;
}

let redo = () => {
  add();

  if(redoValue !== undefined) {
    if(undoValue === redoValue) {
      inputTarget.textContent = '';
      redoButton.classList.add('disabled');
    } else {
      inputTarget.textContent = redoValue;
    }
    redoValue = undefined;
  } else {
    inputTarget.textContent = '';
    redoButton.classList.add('disabled');
  }

}

// onclick="connect()"
/*   observer start */ 

let connect = () => {
  Observer.observe(target, config);
  Observer.observe(inputTarget, config);

  disconnectButton.classList.remove('disabled');
  connectButton.classList.add('disabled');
  console.log('observer started');
};

let disconnect = () => {
  Observer.disconnect();
  disconnectButton.classList.add('disabled');
  connectButton.classList.remove('disabled');
  console.log('observers disconnected');
}


connectButton.addEventListener('click', connect);