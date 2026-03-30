import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddTask from "../component/add";
import ViewTask from "../component/view";
import EditTask from "../component/edit";
import GetTaskList from "../component/list";

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/add" element={<AddTask />} />
      <Route path="/" element={<GetTaskList />} />
      <Route path="/:id" element={<ViewTask />} />
      <Route path="/edit/:id" element={<EditTask />} />
    </Routes>
  </Router>
);
