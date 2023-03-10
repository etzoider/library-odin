bookGrid = document.querySelector('.main');

class Book {
    constructor(title, author, wasRead) {
        this.title = title;
        this.author = author;
        this.wasRead = wasRead;
    }

    toggleRead()                                    {
        this.wasRead = !this.wasRead;
    }

}

class Library {
    constructor(bookList = [], bookGrid) {
        this.bookList = bookList;
        this.bookGrid = bookGrid;
        this.updateBookGrid();
    }

    contains(bookTitle) {
        this.bookList.forEach(book => {
            if (book.title == bookTitle) {
                return true;
            }
        })
        return false
    }

    appendBook(bookItem) {
        this.bookList.push(bookItem);
        this.updateBookGrid(bookGrid);
    }
    
    removeBook(title) {
        if (!this.bookList.contains(title)) {
            return;
        }
        for (let i=0;i<this.bookList.length;i++) {
            let current = this.bookList[i];
            if (current.title == title) {
                this.bookList.slice(i, 1);
                updateBookGrid(bookGrid);
                return
            }
        }
    }

    removeBookByIndex(index) {
        if (index - 1 > this.bookList.length) {
            console.log('returned')
            return
        }

        this.bookList.pop(index);
        this.updateBookGrid();
    }

    createDivFromBook(book, id) {
        let bookCard = document.createElement('div');
        bookCard.id = id;
        bookCard.classList.add('book-card');
        if (book.wasRead == true) {
            bookCard.classList.add('read');
        }
        let title = document.createElement('div')
        title.classList.add('title');
        title.textContent = book.title;

        let author = document.createElement('div');
        author.classList.add('author');
        author.textContent = book.author;

        let cardButtons = document.createElement('div');
        cardButtons.classList.add('card-buttons');

        let toggleReadBtn = document.createElement('button');
        toggleReadBtn.classList.add('toggle-read-btn');
        toggleReadBtn.onClick = "toggleRead(event.target)";
        toggleReadBtn.addEventListener('click', function (e) {e.stopPropagation(); toggleRead(e)}, true);

        let wasReadDisplay=  document.createElement('span');
        wasReadDisplay.classList.add('wasRead-display')
        wasReadDisplay.textContent = 'read';

        let deleteBookBtn = document.createElement('button');
        deleteBookBtn.classList.add('delete-book-btn');
        deleteBookBtn.addEventListener('click', function (e) {e.stopPropagation(); deleteBook(e)}, true);

        let deleteIcon = document.createElement('span');
        deleteIcon.classList.add('material-symbols-outlined');
        deleteIcon.textContent = 'delete';

        toggleReadBtn.appendChild(wasReadDisplay);
        deleteBookBtn.appendChild(deleteIcon);
        cardButtons.appendChild(toggleReadBtn);
        cardButtons.appendChild(deleteBookBtn);

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(cardButtons);
        
        return bookCard;
    }

    updateBookGrid() {
        while (this.bookGrid.firstChild) { //removing all items from html grid
            this.bookGrid.removeChild(this.bookGrid.firstChild);
        }
        this.bookList.forEach((book, index) => { //inserting everything else again, including changes made
            let bookItemDiv = this.createDivFromBook(book, index);
            this.bookGrid.appendChild(bookItemDiv)
        })
    }


}




function openGithub() {
    open('https://github.com/etzoider');
}

function toggleRead(e) {

    let clickedCard = e.target.parentNode.parentNode;
    
    let bookClicked = lib.bookList[clickedCard.id];
    bookClicked.toggleRead();
    console.log(lib.bookList.forEach(book => {book.wasRead}))
    
    if (clickedCard.classList.contains('read')) {
        clickedCard.classList.remove('read');
    } else {
        clickedCard.classList.add('read');
    }
}

function openForm() {
    let formBackgroundDiv = document.querySelector('.form-background');
    let formDiv = document.querySelector('.form');

    formBackgroundDiv.classList.add('active');
    formDiv.classList.add('active');

}

function closeForm(event) {
    event.target.classList.remove('active');
}

function handleLogInClick() {
}

function deleteBook(e) {
    let clickedButton = e.target;
    let clickedCard = clickedButton.parentNode.parentNode;

    if (clickedButton.classList.contains('clicked')) {
        clickedCard.classList.add('hidden');
        setTimeout((e) => {lib.removeBookByIndex(clickedCard.id);
        }, 200)
    } else {
        clickedButton.classList.add('clicked');
        clickedButton.querySelector('span').textContent = 'close'; //changes delete-button icon from trashcan to X
        setTimeout( function () {
            clickedButton.classList.remove('clicked');
            clickedButton.querySelector('span').textContent = 'delete';
        }, 3000);
    }

}

let newBook = new Book(title='Titulo', author = 'Autor', wasRead = false);
let newBook2 = new Book(title='Titulo', author = 'Autor', wasRead = false);
let newBook3 = new Book(title='Titulo', author = 'Autor', wasRead = false);

let lib = new Library([newBook, newBook2, newBook3], bookGrid);

