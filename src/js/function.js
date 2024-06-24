import axios from "axios";
import _ from "lodash";

const input = document.querySelector('#searchInput');
const bookContainer = document.querySelector('.container');
const errorMessage = document.querySelector('.error-message');
const modalContainer = document.querySelector('.modal-container');
const closeModalBtn = document.querySelector('.close-modal');
const descriptionHtml = document.querySelector('.modal');
const spinner = document.querySelector('.spinner');

export function searchBooks() {
    const genre = input.value.trim().toLowerCase();
    if (!genre) {
        errorMessage.textContent = 'INSERT A GENRE';
        errorMessage.classList.remove('display-none');
        return
    }
    errorMessage.classList.add('display-none')
    bookContainer.replaceChildren();
    errorMessage.replaceChildren();
    fetchData(genre)
}

function createCard(bookTitle, bookAuthor, bookContainer, bookKey, keyType, identifier) {
    const card = document.createElement('div');
    card.classList.add('card');
    bookContainer.appendChild(card);

    const author = document.createElement('h1');
    author.textContent = bookAuthor;
    author.classList.add('book-author');
    
    const title = document.createElement('h1');
    title.textContent = bookAuthor;
    title.classList.add('book-title');

    const info = document.createElement('div');
    info.appendChild(title);
    info.appendChild(author);
    card.appendChild(info);

    const img = document.createElement('img');
    img.src = `https://covers.openlibrary.org/b/${keyType}/${identifier}-M.jpg`;
    img.alt = `${bookTitle} cover`;
    img.classList.add('book-cover');
    card.appendChild(img);

    const button = document.createElement('button');
    button.textContent = 'Description';
    button.setAttribute('book-key', bookKey);
    button.classList.add('btn-description');
    card.appendChild(button);

}

async function fetchBook() {
    document.querySelectorAll('.btn-description').forEach(button => {
        button.addEventListener('click', async () => {
            const bookKey = button.getAttribute('book-key');
            spinner.classList.remove('display-none');
            try{
            const response = await axios.get(`https://openlibrary.org${bookKey}.json`)
            let description = 'no description';
            spinner.classList.add('display-none');
            if (response && response.data && response.data.description) {
                if (response.data.description.value) {
                    description = response.data.description.value;
                } else if (response.data.description) {
                    description = response.data.description
                }
            }
            descriptionHtml.textContent = description;
        }catch (error) {
            console.error('Error fetching book description:', error);
            descriptionHtml.textContent = 'Error fetching book description';
        }
            modalContainer.classList.remove('display-none');
        })
    });
}

export function closeModal() {
    closeModalBtn.addEventListener('click', () => {
        modalContainer.classList.add('display-none')
        descriptionHtml.replaceChildren();
    })
}

async function fetchData(genre) {
    try {
        spinner.classList.remove('display-none');
        const response = await axios.get(`https://openlibrary.org/subjects/${genre}.json`);
        const books = response.data.works;
        console.log(books)
        spinner.classList.add('display-none');
        if ( books.length === 0 || books === undefined) {
            errorMessage.textContent = 'Not found';
            errorMessage.classList.remove('display-none')
            return
        }
        errorMessage.classList.add('display-none')
        books.forEach(book => {
            const bookTitle = book.title;
            const bookAuthor = _.uniq(book.authors.map(author => author.name));
            const bookKey = book.key;

            let keyType = null;
            let identifier = null;

            if (book.cover_edition_key) {
                keyType = 'olid';
                identifier = book.cover_edition_key;
            } else if (!_.isEmpty(book.isbn)) {
                keyType = 'isbn';
                identifier = book.isbn[0];
            } else if (!_.isEmpty(book.oclc)) {
                keyType = 'oclc';
                identifier = book.oclc[0];
            } else if (!_.isEmpty(book.lccn)) {
                keyType = 'lccn';
                identifier = book.lccn[0];
            } else if (book.id) {
                keyType = 'id';
                identifier = book.id;
            }

            createCard(bookTitle, bookAuthor, bookContainer, bookKey, keyType, identifier);
        });
        fetchBook();
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}