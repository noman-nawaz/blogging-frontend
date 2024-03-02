import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Register from './components/Users/Register/Register';
import Login from './components/Users/Login/Login';
import Navbar from './components/Navigation/Navbar';
import AddNewCategory from './components/Categories/AddNewCategory';
import UpdateCategory from './components/Categories/UpdateCategory';
import CategoryList from './components/Categories/CategoryList';
import CreatePost from './components/Posts/CreatePost';
import Footer from './components/Footer/Footer';
import AdminRoute from './components/Navigation/ProtectedRoutes/AdminRoute';
import PrivateRoute from './components/Navigation/ProtectedRoutes/PrivateRoute';
import PostsList from './components/Posts/PostsList';
import PostDetails from './components/Posts/PostDetails';
import UpdatePost from './components/Posts/UpdatePost';
import UpdateComment from './components/Comments/UpdateComment';
import Profile from './components/Users/Profile/Profile';
import UploadProfilePhoto from './components/Users/Profile/UploadProfilePhoto';
import UpdateProfileForm from './components/Users/Profile/UpdateProfileForm';
import SendEmail from './components/Users/Emailing/SendEmail';
import AccountVerified from './components/AccountVerification/AccountVerified';
import ResetPasswordForm from './components/Users/ForgetPassword/resetPasswordForm';
import ResetPassword from './components/Users/ForgetPassword/ResetPassword';
import UpdatePassword from './components/Users/ForgetPassword/UpdatePassword';
import UsersList from "./components/Users/UsersList/UsersList";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <AdminRoute exact path="/update-category/:id" component={UpdateCategory} />
        <AdminRoute exact path="/add-category" component={AddNewCategory} />
        <AdminRoute exact path="/category-list" component={CategoryList} />
        <PrivateRoute exact path="/create-post" component={CreatePost} />
        <Route exact path="/posts" component={PostsList} />
        <Route exact path="/posts/:id" component={PostDetails} />
        <PrivateRoute exact path="/update-post/:id" component={UpdatePost} />
        <PrivateRoute exact path="/update-comment/:id" component={UpdateComment} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/upload-profile-photo" component={UploadProfilePhoto} />
        <PrivateRoute exact path="/update-profile/:id" component={UpdateProfileForm} />
        <AdminRoute exact path="/send-mail" component={SendEmail} />
        <PrivateRoute exact path="/verify-account/:token" component={AccountVerified} />
        <Route exact path="/password-reset-token" component={ResetPasswordForm} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />
        <PrivateRoute exact path="/update-password" component={UpdatePassword} />
        <AdminRoute exact path="/users" component={UsersList} />


        

        
        

      </Switch>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
