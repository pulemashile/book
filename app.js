const express = require('express');
const app = express();
const port = 3002;

// Middleware to parse JSON data
app.use(express.json());

// Dummy book data
let books = [
  { title: "Book 1", author: "Author 1", publisher: "Publisher 1", publishedDate: "2020-01-01", isbn: "1234567890" },
  { title: "Book 2", author: "Author 2", publisher: "Publisher 2", publishedDate: "2020-02-01", isbn: "2345678901" },
  { title: "Book 3", author: "Author 3", publisher: "Publisher 3", publishedDate: "2020-03-01", isbn: "3456789012" }

];
// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET a book by ISBN
app.get('/books/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);const express = require('express');
  const app = express();
  const port = 3000;
  const fs = require('fs');
  const dbFile = 'db.json';
  
  // Middleware to parse JSON data
  app.use(express.json());
  
  // Load data from db.json file
  let data = {};
  fs.readFile(dbFile, (err, json) => {
    if (err) {
      console.error(err);
    } else {
      data = JSON.parse(json);
    }
  });
  
  // GET all books
  app.get('/books', (req, res) => {
    res.json(data.books);
  });
  
  // GET a book by ISBN
  app.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = data.books.find((book) => book.isbn === isbn);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(book);
    }
  });
  
  // POST a new book
  app.post('/books', (req, res) => {
    const newBook = req.body;
    data.books.push(newBook);
    fs.writeFile(dbFile, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error(err);
      } else {
        res.status(201).json(newBook);
      }
    });
  });
  
  // PUT (update) a book by ISBN
  app.put('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const updatedBook = req.body;
    const bookIndex = data.books.findIndex((book) => book.isbn === isbn);
    if (bookIndex === -1) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      data.books[bookIndex] = updatedBook;
      fs.writeFile(dbFile, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error(err);
        } else {
          res.json(updatedBook);
        }
      });
    }
  });
  
  // DELETE a book by ISBN
  app.delete('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const bookIndex = data.books.findIndex((book) => book.isbn === isbn);
    if (bookIndex === -1) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      data.books.splice(bookIndex, 1);
      fs.writeFile(dbFile, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error(err);
        } else {
          res.status(204).end();
        }
      });
    }
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

// POST a new book
app.post('/books', (req, res) => {
  const { title, author, publisher, publishedDate, isbn } = req.body;

  // Check if the ISBN already exists
  const existingBook = books.find(b => b.isbn === isbn);
  if (existingBook) {
    return res.status(400).json({ error: 'Book with this ISBN already exists' });
  }

  // Create a new book
  const newBook = { title, author, publisher, publishedDate, isbn };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (update) a book by ISBN
app.put('/books/:isbn', (req, res) => {
  const { title, author, publisher, publishedDate, isbn } = req.body;
  const bookIndex = books.findIndex(b => b.isbn === req.params.isbn);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const updatedBook = { title, author, publisher, publishedDate, isbn };
  books[bookIndex] = updatedBook;
  res.json(updatedBook);
});

// DELETE a book by ISBN
app.delete('/books/:isbn', (req, res) => {
  const bookIndex = books.findIndex(b => b.isbn === req.params.isbn);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  books.splice(bookIndex, 1);
  res.status(204).end();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
