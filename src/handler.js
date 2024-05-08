// const nanoid = require('nanoid')
import { nanoid } from "nanoid";
// const storage = require('./storage.js')
import storage from "./storage.js";

const addBookHandler = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    const res = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    res.type("application/json");
    res.code(400);
    return res;
  }

  if (readPage > pageCount) {
    const res = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    res.type("application/json");
    res.code(400);
    return res;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished = pageCount === readPage ? true : false;

  const books = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  storage.push(books);
  const isSuccess = storage.filter((book) => book.id === id).length >= 0;
  if (isSuccess) {
    const res = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    res.type("application/json");
    res.code(201);
    return res;
  }
};

const getAllBooks = (req, h) => {
  const { name, reading, finished } = req.query;
  const filteredBooks = storage.filter((book) => {
    if (name) {
      return book.name.toLowerCase().includes(name.toLowerCase());
    }
    if (reading) {
      return book.reading === (reading === "1");
    }
    if (finished) {
      return book.finished === (finished === "1");
    }
    return true;
  });

  const reducedBooks = filteredBooks.map(({ id, name, publisher }) => ({
    id,
    name,
    publisher,
  }));

  const res = h.response({
    status: "success",
    data: {
      books: reducedBooks,
    },
  });
  return res;
};

const getSpecificBook = (req, h) => {
  const { id } = req.params;

  const book = storage.filter((book) => book.id === id)[0];

  if (book) {
    const res = h.response({
      status: "success",
      data: { book: book },
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });

  res.code(404);
  return res;
};

const updateBook = (req, h) => {
  const { id } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    const res = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    res.type("application/json");
    res.code(400);
    return res;
  }

  if (readPage > pageCount) {
    const res = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    res.type("application/json");
    res.code(400);
    return res;
  }
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished = pageCount === readPage ? true : false;

  const index = storage.findIndex((book) => book.id === id);

  if (index !== -1) {
    storage[index] = {
      ...storage[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      insertedAt,
      updatedAt,
    };

    const res = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });

  res.code(404);
  return res;
};

const deleteBook = (req, h) => {
  const { id } = req.params;
  const index = storage.findIndex((book) => book.id === id);

  if (index !== -1) {
    storage.splice(index, 1);
    const res = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    res.code = 200;
    return res;
  }

  const res = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  res.code(404);
  return res;
};

export { addBookHandler, getAllBooks, getSpecificBook, updateBook, deleteBook };
