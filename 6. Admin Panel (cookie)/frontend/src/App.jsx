import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./component/Dashboard"
import AddUserForm from "./component/AddForm"
import UserList from "./component/UsersList"
import EditUserForm from "./component/EditForm"
import AdminAuth from "./component/Auth"
import NotFound from "./component/NotFound"
import axios from "axios"
import { useEffect, useState } from "react"

function App() {

  const [login, setLogin] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:9000/auth-check", {withCredentials: true});

      if (res.data.token) {
        setLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkAuth();    
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={login ? <Dashboard /> :<AdminAuth />} /> 
          {login && 
          <>
            <Route path="/users/add" element={<AddUserForm />} />
            <Route path="/users/view" element={<UserList />} />
            <Route path="/users/edit/:id" element={<EditUserForm />} />
            <Route path="/settings" element={<Dashboard />} />
          </>}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
