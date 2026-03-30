import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddTask from "../components/add";
import ViewTask from "../components/view";
import EditTask from "../components/edit";
import GetTaskList from "../components/list";

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/add" element={<AddTask />} />
      <Route path="/" element={<GetTaskList />} />
      <Route path="/edit/:id" element={<EditTask />} />
      <Route path="/details/:id" element={<ViewTask />} />
    </Routes>
  </Router>
);
