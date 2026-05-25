import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GeneratePage from "./components/GeneratePage";
import ErrorPage from "./components/ErrorPage";
import BookSearchPage from "./components/BookSearchPage";
import Bookshelf from "./components/Bookshelf";
import BookCollection from "./components/BookCollection";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Router>
        <Nav />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<GeneratePage />} />
            <Route path="/search" element={<BookSearchPage />} />
            <Route
              path="/current"
              element={<BookCollection listName="Current" />}
            />
            <Route path="/read" element={<BookCollection listName="Read" />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}
export default App;
