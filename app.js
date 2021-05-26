// VARIABLES
let myLibrary = [
    new Book("The Hobbit", "J.R.R Tolkien", 295, false), 
    new Book("To Kill a Mockingbird", "Harper Lee", 281, true)
];
const list = document.querySelector("table");
const data = Object.keys(myLibrary[0]);
const header = list.createTHead();
const rowHeader = header.insertRow();
const modal = document.querySelector(".modal");

let bookIndex = "";

function Book(title = "Title", author = "Author", pages = 0, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'have read' : 'not read yet'}`;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
    //console.log(this.title + " " + this.read);
}

// FUNCTIONS
const addBookToLibrary = (title, author, pages, read) => {
    myLibrary.push(new Book(title, author, pages, read));
}

const displayTableItems = () => {    
    // Generate the table items
    for(let book of myLibrary) {
        let row = list.insertRow();
        let index = myLibrary.indexOf(book);
        for(key in book) {
            if(typeof book[key] !== "function") {
                let cell = row.insertCell();
                let text = document.createTextNode(book[key]);
                if(typeof book[key] === "boolean") {
                    cell.innerHTML = `<input type="checkbox" ${book[key]? 'checked' : ''} id=${index}>`;
                    document.getElementById(index.toString()).addEventListener('click', () => book.toggleRead());
                } else {
                    cell.appendChild(text);
                }
            }
        }
        // Edit and Delete icons
        row.insertCell().innerHTML = `<span class="material-icons-outlined" title="Edit" id=edit-${index}>edit_note</span>
                                        <span class="material-icons-outlined" id=del-${index} title="Delete">delete</span>`;
        document.getElementById("edit-" + index).addEventListener('click', () => {
            openInputWindow(index);
            bookIndex = index;
        });
        document.getElementById("del-" + index).addEventListener('click', () => {
            openDeleteWindow(book);
            bookIndex = index;
        });
    }
}

const initTableHeader = () => {
    // Generate the table header
    for(let key of data) {
        let th = document.createElement("th");
        let headerText = key.replace(/(^|\s)\S/g, L => L.toUpperCase()); // Title case the keys
        let content = document.createTextNode(headerText);

        th.appendChild(content);
        rowHeader.appendChild(th);
    }
    rowHeader.appendChild(document.createElement("th"));
}

const refreshTable = () => {
    // clear table first
    while (list.rows.length > 1) {
        list.deleteRow(1);
    }
    displayTableItems();
}

const removeBook = index => {
    myLibrary.splice(index, 1);
    refreshTable();
}

const editBook = (index, title, author, pages, read) => {
    myLibrary[index].title = title;
    myLibrary[index].author = author;
    myLibrary[index].pages = pages;
    myLibrary[index].read = read;
}

const openDeleteWindow = book => {
    document.querySelector(".modal").style.display = "block";
    document.querySelector(".modal-box-delete").style.display = "flex";
    document.querySelector(".modal-box-input").style.display = "none";
    document.querySelector(".modal-message").textContent = `Are you sure you want to delete '${book.title}'?`;
}

const openInputWindow = (book = "") => {
    document.querySelector(".modal").style.display = "block";
    document.querySelector(".modal-box-input").style.display = "flex";
    document.querySelector(".modal-box-delete").style.display = "none";

    if(book !== "") {
        document.getElementById("title").value = myLibrary[book].title;
        document.getElementById("author").value = myLibrary[book].author;
        document.getElementById("pages").value = myLibrary[book].pages;
        document.getElementById("read").checked = myLibrary[book].read;
    }
}

const closeModalWindow = () => {
    modal.style.display = "none";
    bookIndex = "";
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;
}

// WINDOW
onload = () => {
    initTableHeader();
    displayTableItems();

    // Add New button
    document.getElementById("addBook").addEventListener("click", () => {
        openInputWindow();
    });

    // Submit button
    document.getElementById("submit").addEventListener("click", () => {
        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        let read = document.getElementById("read").checked;

        if(title != "" && author != "" && pages != "") {
            (bookIndex !== "") ? editBook(bookIndex, title, author, pages, read) : addBookToLibrary(title, author, pages, read)
            refreshTable();
            closeModalWindow();
        } 
    });

    // Delete button
    document.getElementById("delete").addEventListener("click", () => {
        removeBook(bookIndex);
        closeModalWindow();
    });  

    // Cancel button
    document.querySelectorAll(".cancel").forEach(button => {
        button.addEventListener("click", () => closeModalWindow());
    }); 
}

onclick = event => {
   if(event.target == modal) {
       closeModalWindow();
   }
}

