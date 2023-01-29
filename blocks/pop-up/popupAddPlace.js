// Обработчик кнопки добавить место, открытие попап добавление нового места

function popapAddMesto(){
  let main = document.querySelector("#main");
  let popup = document.querySelector(".pop-up");
  let popapCopy = popup.cloneNode(true);

  // клонировать попап
  main.append(popapCopy); 
  popapCopy.classList.remove("pop-up_active");

  let popapClose = popapCopy.querySelector(".pop-up__close-button");
  let buttonAdd = popapCopy.querySelector(".pop-up__button");

  popapCopy.querySelector('.pop-up__title').textContent = 'Новое место';
  popapCopy.querySelector('#namePlase').value = '';
  popapCopy.querySelector('#namePlase').placeholder = 'Название';
  popapCopy.querySelector('#ssilkaPlase').value = '';
  popapCopy.querySelector('#ssilkaPlase').placeholder = 'Ссылка на картинку';
  popapCopy.querySelector('.pop-up__button').textContent = 'Создать';

  // кнопка закрытия попап
  popapClose.addEventListener("click", function(){
    popapCopy.classList.add("pop-up_active");
  });

  // кнопка добавить новое место
  buttonAdd.addEventListener("click", function(evt){

    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    let plasesСardTemplate = document.querySelector('#plases-card').content;
    let plases = document.querySelector('.plases');
    let plasesСardElement = plasesСardTemplate.querySelector('.plases-card').cloneNode(true);

    plasesСardElement.querySelector('.plases-card__img').src = popapCopy.querySelector('#ssilkaPlase').value;
    plasesСardElement.querySelector('.plases-card__img').alt = popapCopy.querySelector('#namePlase').value;
    plasesСardElement.querySelector('.plases-card__title').textContent = popapCopy.querySelector('#namePlase').value;

    popapCopy.classList.add("pop-up_active");
  
    plases.prepend(plasesСardElement); 

    buttonLike = document.querySelectorAll('.plases-card__like');

  });

}

popupMesto.addEventListener("click", popapAddMesto);