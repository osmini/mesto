
let popapImg = document.querySelector(".popup-img");
let buttonClossePopapImg = document.querySelector(".popup-img__close-button");
let imagePlases = document.querySelectorAll(".plases-card__img");

function closesPopup() {
  popapImg.classList.add("pop-up_active");
}

// кажатие на картинку
imagePlases.forEach(function(amgActive) {

  amgActive.addEventListener("click", function(item){
    
    let ssilkaPopupImg = popapImg.querySelector(".popup-img__image");
    ssilkaPopupImg.src = item.target['src'];

    let captionPopupImg = popapImg.querySelector(".popup-img__caption");
    captionPopupImg.textContent = item.target['alt'];

    popapImg.classList.remove("pop-up_active");

  });
});

buttonClossePopapImg.addEventListener("click", closesPopup);
