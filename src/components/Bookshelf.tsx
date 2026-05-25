//TODO: THIS WILL NOW HOLD CURRENT AND READ PAGES

import BookCollection from "./BookCollection";

export default function Bookshelf() {
  return (
    <>
      <BookCollection listName="Current" />
      <BookCollection listName="Read" />

    </>
  );
}
