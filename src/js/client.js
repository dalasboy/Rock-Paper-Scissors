
const writeEvent = (text) => {
    // <ul> element
    const parent = document.querySelector('#events');
  
    // <li> element
    const el = document.createElement('li');
    el.innerHTML = text;
  
    parent.appendChild(el);
  };

  const onFormSubmit=(e)=>{
      e.preventDefault()
      const input = document.querySelector('#chat')
      const text =input.value
      input.value = ''
    sock.emit('message',text)
  }
  const TopEvent =()=>{
    const top_message = document.querySelector('#paragraf')
    sock.on('display_left',(msg)=>{
      top_message.textContent = ''
      top_message.append(msg)
    })
    sock.on('display_right',(msg)=>{
      top_message.append(msg)
    })
    bottom_message = document.querySelector('#anotherparagraf')
    sock.on('disp',(msg)=>{
      bottom_message.textContent = ''
      bottom_message.append(msg)
    })
    user = document.querySelector('#user-score')
    comp = document.querySelector('#computer-score')
    sock.on('scor',(msg)=>{
      
      user.textContent = ''
      comp.textContent = ''
      console.log(msg)
      user.append(msg[0])
      comp.append(msg[2])
      console.log(user.textContent + ' : ' +comp.textContent)
    })
    
  }
  const addButtonListeners = () => {
    ['rock', 'paper', 'scissors'].forEach((id) => {
      const button = document.getElementById(id);
      button.addEventListener('click', () => {
        sock.emit('turn', id);
      });
    });
  };
  
  writeEvent('Rock-Paper-Scissors')
const sock = io()
sock.on('message',writeEvent)
document.querySelector('#chat_form').addEventListener('submit',onFormSubmit)
addButtonListeners()
TopEvent()