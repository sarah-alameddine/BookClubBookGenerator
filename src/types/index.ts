// Book types
export interface Book {
  id: string;
  title: string;
  author: string;
  bookId: string;
  read: boolean;
  publishedDate?: string;
}

export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate?: string;
  };
}
