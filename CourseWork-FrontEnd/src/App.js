import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import './App.css';
import NavBar from "./component/common/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import CourseView from './component/course/CourseView';
import AddNewCourse from "./component/course/AddNewCourse";
import InstanceView from "./component/course/InstanceView";
import AddInstance from "./component/course/AddInstance";





function App() {
  return (
    <main className="container mt-5">
    <Router>
    <NavBar />
      <Routes>
        <Route exact path="/api" element={<Home />}></Route>
        <Route exact path="/View-All-courses" element={<CourseView />}></Route>
        <Route exact path="/Add-New-Course" element={<AddNewCourse />}></Route>
        <Route exact path="/Add-Instance" element={<AddInstance />}></Route>
        <Route exact path="/View Instance" element={<InstanceView />}></Route>
      </Routes>
    </Router>
    </main>
  );
}

export default App;
