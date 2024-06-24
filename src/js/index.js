import '../style/style.css';
import { closeModal, searchBooks } from './function.js';
import '../img/bookshelf.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import '../public/favicon.ico'
const form = document.querySelector('.form-data');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchBooks();
    closeModal();
})


