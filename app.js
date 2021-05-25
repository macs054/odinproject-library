let myLibrary = [
    new Book("The Hobbit", "J.R.R Tolkien", 295, false), 
    new Book("To Kill a Mockingbird", "Harper Lee", 281, true)
];
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

const addBookToLibrary = (title, author, pages, read) => {
    myLibrary.push(new Book(title, author, pages, read));
}

const displayTableItems = () => {
    //console.table(myLibrary);
    const list = document.querySelector("table");
        
    // Generate the table items
    for(let book of myLibrary) {
        let row = list.insertRow();
        for(key in book) {
            if(typeof book[key] !== "function") {
                let cell = row.insertCell();
                let text = document.createTextNode(book[key]);
                if(typeof book[key] === "boolean") {
                    cell.innerHTML = `<input type="checkbox" ${book[key]? 'checked' : ''} id=${myLibrary.indexOf(book)}>`;
                    document.getElementById(myLibrary.indexOf(book)).addEventListener('click', () => book.toggleRead());
                } else {
                    cell.appendChild(text);
                }
            }
        }
    }
}

const initTableHeader = () => {
    const list = document.querySelector("table");
    const data = Object.keys(myLibrary[0]);
    const header = list.createTHead();
    const rowHeader = header.insertRow();

    // Generate the table header
    for(let key of data) {
        let th = document.createElement("th");
        let headerText = key.replace(/(^|\s)\S/g, L => L.toUpperCase()); // Title case the keys
        let content = document.createTextNode(headerText);

        th.appendChild(content);
        rowHeader.appendChild(th);
    }
}

const refreshTable = () => {
    const list = document.querySelector("table");
    list.innerHTML = "";
    initTableHeader();
    displayTableItems();
}

onload = () => {
    refreshTable();  

    document.getElementById("addBook").addEventListener("click", () => {
        addBookToLibrary("Title", "Author", 10, true); 
        refreshTable();
    });
}

