// App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import useAuthCheck from './hooks/useAuthCheck';
import './index.css';

const router = createBrowserRouter([
  {
    path:'/',
    element:<HomePage />
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  }
])

function App() {
  const isChecking = useAuthCheck();

  if (isChecking) {
    return (
      <div className='p-4 h-screen flex items-center justify-center'>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
