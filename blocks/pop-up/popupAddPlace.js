// Обработчик кнопки добавить место, открытие попап добавление нового места
function popapAddMesto(){
  let main = document.querySelector("#main");
  let popup = document.querySelector(".pop-up");
  let popapCopy = popup.cloneNode(true);

  // клонировать попап
  main.append(popapCopy); 
  popapCopy.classList.remove("pop-up_active");

  let popapClose = popapCopy.querySelector(".pop-up__close-button");


  popapCopy.querySelector('.pop-up__title').textContent = 'Новое место';
  popapCopy.querySelector('#namePlase').value = '';
  popapCopy.querySelector('#namePlase').placeholder = 'Название';
  popapCopy.querySelector('#ssilkaPlase').value = '';
  popapCopy.querySelector('#ssilkaPlase').placeholder = 'Ссылка на картинку';
  popapCopy.querySelector('.pop-up__button').textContent = 'Создать';

  popapClose.addEventListener("click", function(){
    popapCopy.classList.add("pop-up_active");
  });
}

popupMesto.addEventListener("click", popapAddMesto);