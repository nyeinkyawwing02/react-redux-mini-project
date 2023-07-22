import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AddGame from './pages/AddGame';
import EditGame from './pages/EditGame';
import MainLayout from './layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path="games">
            <Route index element={<AddGame />} />
            <Route path='add' element={<AddGame />} />
            <Route path=":id" element={<EditGame />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
