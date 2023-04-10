// класс который отвечает за отрисовку элементов на странице
export class Section {

    constructor({items, render}, selector) {
        this._initialArray = items;
				this._render = render; 

        this._container = document.querySelector(`${selector}`);
        this.myCard = 0;
    }

		// вставляем элемент в конец на страницу
    addItem(element){
      this._container.append(element);
    }

    // вставляем элемент в начало на страницу
    prependItem(element){
      this._container.prepend(element);
    }



    // создаем карточку и вставляем на страницу
    renderItems(){
      // циклом добавляем карточки на страницу
      this._initialArray.forEach(item => {
        this._render(item); // вызываем renderer, передав item
      }); 
    }

}

