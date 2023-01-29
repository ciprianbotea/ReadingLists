import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Navigation from './Navigation';
import Author from './Components/Author';
import Authors from './Components/Authors';
import Publisher from './Components/Publisher';
import Publishers from './Components/Publishers';
import Book from './Components/Book';
import Books from './Components/Books';
import AddAuthor from './Components/AddAuthor';
import AddPublisher from './Components/AddPublisher';
import AddBook from './Components/AddBook';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:authorId" element={<Author />} />
        <Route path="/authors/newAuthor" element={<AddAuthor />} />
        <Route path="/publishers" element={<Publishers />} />
        <Route path="/publishers/:publisherId" element={<Publisher />} />
        <Route path="/publishers/newPublisher" element={<AddPublisher />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<Book />} />
        <Route path="/books/newBook" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
