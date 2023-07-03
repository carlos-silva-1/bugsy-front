import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import IssuesScreen from './screens/IssuesScreen.jsx';
import CreateIssueScreen from './screens/CreateIssueScreen.jsx';
import EditIssueScreen from './screens/EditIssueScreen.jsx';
import AssignedIssuesScreen from './screens/AssignedIssuesScreen.jsx';
import IssueDetailsScreen from './screens/IssueDetailsScreen.jsx';
import AboutScreen from './screens/AboutScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route path='/view-issues' element={<IssuesScreen />} />
      <Route path='/issue-details' element={<IssueDetailsScreen />} />
      <Route path='/create-issue' element={<CreateIssueScreen />} />
      <Route path='/edit-issue' element={<EditIssueScreen />} />
      <Route path='/assigned-issues' element={<AssignedIssuesScreen />} />
      <Route path='/about' element={<AboutScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
