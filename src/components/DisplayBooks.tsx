import React from 'react'
import Buttons from "./Buttons";

import { Book } from '../types';

interface DisplayBooksProps {
  bookList: Book[];
}

export default function DisplayBooks({ bookList }: DisplayBooksProps) {
    return (
        <div>
        {bookList.map((book: Book) => {
          return ( 
          <div> 
            <img
                alt={`${book.title} book`}
                src={`http://books.google.com/books/content?id=${book.bookId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
              />
            <h1>{book.title}</h1>
            <h1>{book.author}</h1>
          </div>
          );
        })}
        </div>
    )
}
