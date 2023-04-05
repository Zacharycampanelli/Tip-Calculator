const customTip = document.getElementById('custom');



// Right align input text once it is entered
customTip.addEventListener('input', () => {
  customTip.setAttribute('id', 'dataEntered');
});

// If text is removed and item loses focus, align placehold text to the right
customTip.addEventListener('focusout', () => {
  if (customTip.value == '') {
    customTip.removeAttribute('id');
  }
});
