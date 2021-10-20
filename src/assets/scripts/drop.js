window.addEventListener('click', (event) => {
  const button = event.target.closest('.drop__button')

  if (button) {
    const drop = button.closest('.drop')
    const content = drop.querySelector('.drop__content')
    
    drop.classList.toggle('drop--open')
    $(content).slideToggle(650)
  }
})
