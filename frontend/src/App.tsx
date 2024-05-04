import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import './App.css'
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SingIn from "./pages/SingIn";


const App = () =>  {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <p>Trang chủ</p>
        </Layout>}>
        </Route>

        <Route path="/search" element={<Layout>
          <p>Tìm kiếm</p>
        </Layout>}>
        </Route>

        <Route path="/dangky" element={ <Layout>
          <Register></Register>
        </Layout> }>
        </Route>

        <Route path="/dangnhap" element={ <Layout>
          <SingIn></SingIn>
        </Layout> }>
        </Route>
      </Routes>
    </Router>
  )

}

export default App
