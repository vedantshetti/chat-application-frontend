import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import './index.css';

const router = createBrowserRouter([
  {
    path:'/',
    element:<HomePage />
  },
  {
    path:'/register',
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  }
])
  


function App() {
  return (
    <div className='App'>
      <RouterProvider router={router }/>
    </div>
  );
}

export default App;
