import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Dashboard from "./component/Dashboard"

// users
import AddUserForm from "./component/Users/AddForm"
import UserList from "./component/Users/UsersList"
import EditUserForm from "./component/Users/EditForm"

import AdminAuth from "./component/Auth"
import Settings from "./component/Settings"
import ChangePwd from "./component/ChangePwd"
import NotFound from "./component/NotFound"
import ForgotPassword from "./component/FotgotPwd"
import VerifyOtp from "./component/VerifyOtp"
import ResetPassword from "./component/ResetPassword"
import AddCategory from "./component/Categories/AddCategories"
import CategoryList from "./component/Categories/CategoryList"
import EditCategory from "./component/Categories/EditCategory"
import AddSubCategory from "./component/SubCategories/AddSubCategories"
import ViewSubCategories from "./component/SubCategories/ViewSubCategories"
import EditSubCategory from "./component/SubCategories/EditSubCategory"
import TrashCategory from "./component/Categories/TrashCategory"
import TrashSubCategory from "./component/SubCategories/TrashSubCategory"

// extra category
import AddExtraCategory from "./component/ExtraCategories/AddExtraCategory"
import ViewExtraSubCategories from "./component/ExtraCategories/ViewExtraCategory"
import EditExtraSubCategory from "./component/ExtraCategories/EditExtraCategory"
import TrashExtraCategory from "./component/ExtraCategories/TrashCategory"

// product
import AddProduct from "./component/Products/AddProducts"
import ViewProducts from "./component/Products/ViewProducts"
import EditProduct from "./component/Products/EditProucts"
import TrashProduct from "./component/Products/TrashProducts"
import UserTrash from "./component/Users/TrashUsers"

function App() {

  const [login, setLogin] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:9000/auth-check", {withCredentials: true});

      if (res.data.success) {
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
            {/* Users */}
            <Route path="/users/add" element={<AddUserForm />} />
            <Route path="/users/view" element={<UserList />} />
            <Route path="/users/edit/:id" element={<EditUserForm />} />
            <Route path="/users/trash" element={<UserTrash />} />

            {/* Categories */}
            <Route path="/categories/add" element={<AddCategory />} />
            <Route path="/categories/view" element={<CategoryList />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route path="/categories/trash" element={<TrashCategory />} />

            {/* Sub Categories */}
            <Route path="/sub-categories/add" element={<AddSubCategory />} />
            <Route path="/sub-categories/view" element={<ViewSubCategories />} />
            <Route path="/sub-categories/edit/:id" element={<EditSubCategory />} />
            <Route path="/sub-categories/trash" element={<TrashSubCategory />} />

            {/* Extra Sub Categories */}
            <Route path="/extra-categories/add" element={<AddExtraCategory />} />
            <Route path="/extra-categories/view" element={<ViewExtraSubCategories />} />
            <Route path="/extra-categories/edit/:id" element={<EditExtraSubCategory />} />
            <Route path="/extra-categories/trash" element={<TrashExtraCategory />} />

            {/* Products */}
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/view" element={<ViewProducts />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/products/trash" element={<TrashProduct />} />

            <Route path="/change-password" element={<ChangePwd />} />
            <Route path="/settings" element={<Settings />} />
          </>}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
