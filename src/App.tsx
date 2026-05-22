import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrentBooksListPage from "./components/CurrentBooksListPage";
import ReadBooksListPage from "./components/ReadBooksListPage";
import GeneratePage from "./components/GeneratePage";
import ErrorPage from "./components/ErrorPage";
import BookSearchPage from "./components/BookSearchPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Router>
        <Nav />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<GeneratePage />} />
            <Route path="/search2" element={<BookSearchPage />} />
            <Route path="/CurrReadPage" element={<CurrentBooksListPage />} />
            <Route path="/readPage" element={<ReadBooksListPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}
export default App;
