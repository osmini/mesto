let buttonLike = document.querySelectorAll('.plases-card__like');

// лике картинок которые добавлены по умолчанию на странице
buttonLike.forEach(function(button) {
  button.addEventListener("click", function(like){
    
    like.target.classList.toggle("plases-card__like_active");

  });
});

