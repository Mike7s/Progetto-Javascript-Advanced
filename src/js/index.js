import '../style/style.css';
import { closeModal, searchBooks } from './function.js';
import '../img/bookshelf.png';
const form = document.querySelector('.form-data');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    searchBooks();
    closeModal();
})


