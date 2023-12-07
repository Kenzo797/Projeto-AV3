import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', published_date: '', description: '' });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:/api/books/');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      // Faz a requisição POST para adicionar um novo livro
      await axios.post('http://localhost:/api/books/', newBook);

      // Atualiza a lista de livros após adicionar um novo
      const response = await axios.get('http://localhost:/api/books/');
      setBooks(response.data);

      // Limpa o estado do novo livro
      setNewBook({ title: '', author: '', published_date: '', description: '' });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Livros</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author}
          </li>
        ))}
      </ul>

      <h3>Adicionar Novo Livro</h3>
      <form onSubmit={handleAddBook}>
        <label>
          Título:
          <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Autor:
          <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Data de Publicação:
          <input type="date" name="published_date" value={newBook.published_date} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Descrição:
          <textarea name="description" value={newBook.description} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Adicionar Livro</button>
      </form>
    </div>
  );
};

export default BookList;