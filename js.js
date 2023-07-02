let myLibrary = [harryPotter = {
    title: 'Harry Potter and the Gemstone',
    author: 'J.K Rowling',
    pages: 343,
    read: 'Read',
}, toKillAMockingbird = {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    pages: 331,
    read: 'Not read',
}, phoenixTransformation = {
    title: 'The Phoenix Transformation: 12 Qualities of High Achievers to Reboot Your Career and Life',
    author: 'Brian Tracy',
    pages: 224,
    read: 'Read',
} ];


function Book(title, author, pages, read) {
    this.title = title, 
    this.author = author,
    this.pages = pages,
    this.read = read
}

let table = document.getElementById('book-table');

let bookIndex = 1;

function addBookToLibrary(title, author, pages, read) {
    let book = title;
    book = new Book(book, author, pages, read);
    myLibrary.push(book);
    let row = table.insertRow(-1);
    for (const property in book) {
        if(property !== 'read') {
            let td = row.insertCell(-1);
            td.innerHTML = book[property];
        } else if (property === 'read') {
            let td = row.insertCell('-1');
            let button = document.createElement('button');
            button.classList.add('read-button');
            button.innerHTML = book[property];
            button.setAttribute('data-index', bookIndex);
            button.addEventListener('click', () => {
            let buttonIndex = Number(button.getAttribute('data-index'));
            console.log(bookIndex);
                if(button.innerHTML === 'Read') {
                    myLibrary[bookIndex].read = 'Not read';
                    button.classList.remove('read');
                    button.classList.add('unread');
                    button.innerHTML = 'Not read';
                } else {
                    myLibrary[bookIndex].read = 'Read';
                    button.classList.remove('unread');
                    button.classList.add('read');
                    button.innerHTML = 'Read';
                }
            })
            if (button.innerHTML == 'Read') {
                button.classList.add('read');
            } else {
                button.classList.add('unread');
            }
            td.appendChild(button);
        } else {
            let td = row.insertCell('-1');
            let deleteButton = document.createElement('button');
            deleteButton.setAttribute('data-index', bookIndex);
            deleteButton.classList.add('delete-button');
            td.appendChild(deleteButton);
        }
    }
    bookIndex += 1;
}
function showBooks() {
    myLibrary.forEach((element) => {
      let row = table.insertRow(-1);
      bookIndex = myLibrary.indexOf(element) + 1;
      for (const property in element) {
        if (property !== 'read') {
          let td = row.insertCell(-1);
          td.innerHTML = element[property];
        } else if (property === 'read') {
          let td = row.insertCell('-1');
          let button = document.createElement('button');
          button.classList.add('read-button');
          button.innerHTML = element[property];
          button.setAttribute('data-index', bookIndex);
          if (button.innerHTML == 'Read') {
            button.classList.add('read');
          } else {
            button.classList.add('unread');
          }
          td.appendChild(button);
        }
      }
  
      let td = row.insertCell('-1');
      let deleteButton = document.createElement('button');
      deleteButton.setAttribute('data-index', bookIndex);
      deleteButton.classList.add('delete-button');
      deleteButton.innerHTML = 'Delete'
      td.appendChild(deleteButton);
    });
  }
  

showBooks();
const form = document.getElementById('form');
let btn = document.getElementById('add-book');
btn.addEventListener('click', () => {
    form.classList.remove('invisible');
})

let submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
    event.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').value;
    addBookToLibrary(title, author, pages, read)
    form.classList.add('invisible');
})

let readbuttons = document.getElementsByClassName('read-button');
Array.from(readbuttons).forEach((button) => {
    button.addEventListener('click', () => {
        let buttonIndex = Number(button.getAttribute('data-index')) - 1;
        console.log(buttonIndex);
        if(button.innerHTML === 'Read') {
            myLibrary[buttonIndex].read = 'Not read';
            button.classList.remove('read');
            button.classList.add('unread');
            button.innerHTML = 'Not read';
        } else {
            myLibrary[buttonIndex].read = 'Read';
            button.classList.remove('unread');
            button.classList.add('read');
            button.innerHTML = 'Read';
        }
    })
})

let deleteButtons = document.getElementsByClassName('delete-button');
Array.from(deleteButtons).forEach((button) => {
    button.addEventListener('click', () => {
        let buttonIndex = Number(button.getAttribute('data-index'));
        myLibrary.splice(buttonIndex - 1, 1);
        document.getElementById('book-table').deleteRow(buttonIndex);
        deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach((button) => {
            let bookIndex = myLibrary.indexOf(button);
            button.removeAttribute('data-index');
            button.setAttribute('data-index', bookIndex);
        })
    })
})
