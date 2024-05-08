// const {addBookHandler} = require('./handler.js')
import {addBookHandler, getAllBooks, getSpecificBook, updateBook, deleteBook} from './handler.js'

const routes = [
    {
        method: "POST",
        path: "/books",
        handler: addBookHandler,
      },

    {
        method: "GET",
        path: "/books",
        handler: getAllBooks,  
    },

    {
      method: "GET",
      path: "/books/{id}",
      handler: getSpecificBook,
    },

    {
      method: "PUT",
      path: "/books/{id}",
      handler: updateBook,
    },

    {
      method: "DELETE",
      path: "/books/{id}",
      handler: deleteBook,
    }
];

// module.exports = routes
export default routes;

