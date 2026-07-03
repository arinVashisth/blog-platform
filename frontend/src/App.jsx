import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import SingleBlog from "./pages/SingleBlog";
import CategoryPage from "./pages/CategoryPage";
import AuthorPage from "./pages/AuthorPage";
import TagPage from "./pages/TagePage"
import About from "./pages/About"
import Contact from "./pages/Contact";

export default function App() {
  return (
    <>
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/blog/:slug"
          element={<SingleBlog />}
        />
        <Route
            path="/category/:category"
            element={<CategoryPage />}
        />

        <Route
            path="/author/:author"
            element={<AuthorPage />}
        />
        <Route
            path="/tag/:tag"
            element={<TagPage />}
        />
        <Route
            path="/about"
            element={<About />}
        />

        <Route
            path="/contact"
            element={<Contact />}
        />

      </Routes>

    </BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
  />
    </>
  );
}