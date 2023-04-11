// класс который отвечает за отрисовку элементов на странице
export class Section {

    constructor({items, render}, selector) {
        this._initialArray = items;
				this._render = render; 

        this._container = document.querySelector(`${selector}`);
    }

		// вставляем элемент в конец на страницу
    addItem(element){
      this._container.prepend(element);
    }

    // вставляем элемент в начало на страницу
    prependItem(element){
      this._container.append(element);
    }



    // создаем карточку и вставляем на страницу
    renderItems(){
      // циклом добавляем карточки на страницу
      this._initialArray.forEach(item => {
        this._render(item); // вызываем renderer, передав item
      }); 
    }

}

