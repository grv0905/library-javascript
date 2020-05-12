console.log('This is ES6 version of Project 2');
class Book {
    constructor(bookid, name, author, issuer, type) {
        this.bookid=bookid;
        this.name = name;
        this.author = author;
        this.issuer=issuer;
        this.type = type;
    }
}

class Display {
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tablebody');
        let uiString = `<tr>
                            <td>${book.bookid}</td>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.issuer}</td>
                            <td>${book.type}</td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libform');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 3 || book.author.length < 3) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='Success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libform');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
      let bookid = document.getElementById('bookid').value;
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('authorname').value;
    let issuer = document.getElementById('issuedtoname').value;
    let type;
    let fiction = document.getElementById('fiction');
    let nonfiction = document.getElementById('nonfiction');
    let scitech= document.getElementById('scitech');
    let agriculture = document.getElementById('agriculture');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (nonfiction.checked) {
        type = nonfiction.value;
    }
    else if (scitech.checked) {
        type = scitech.value;
    }
    else if (agriculture.checked) {
        type = agriculture.value;
    }

    let book = new Book(bookid, name, author, issuer, type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('Success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('Error', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}
