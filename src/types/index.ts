export type ClubBook = {
  id: string;
  title: string;
  author: string;
  bookId: string;
  publishedDate?: string;
  read: boolean;
  cover?: string;
};

export type Club = {
  id: string;
  name: string;
  createdAt: Date;
  createdBy: string;
};

export type AppUser = {
  id: string;
  email: string;
  clubId?: string;
};

export interface OpenLibraryBookRaw {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}
