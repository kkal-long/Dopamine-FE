import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategorySelectPage from "./search/CategorySelectPage";
import CategoryResultPage from "./search/CategoryResultPage";
import SearchPage from "./search/SearchPage";
import SearchResultPage from "./search/SearchResultPage";
import CategorySearchPage from "./search/CategorySearchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategorySelectPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/result" element={<SearchResultPage />} />
        <Route
          path="/search/category-result"
          element={<CategoryResultPage />}
        />
        <Route
          path="/search/category-search"
          element={<CategorySearchPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
