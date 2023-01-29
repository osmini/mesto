let buttonDel = document.querySelectorAll('.plases-card__del');

buttonDel.forEach(function(button) {
  button.addEventListener("click", function(del){
    
    let delCard = del.target.closest('.plases-card');
    delCard.remove();

  });
});

