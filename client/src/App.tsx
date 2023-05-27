import React, { useEffect } from 'react';
import { useAuth } from './context/auth-context';
import { setAxiosDefault, setToken } from './axiosDefault';
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import Global from './components/Global';
import Redirect from './pages/Redirect';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  const { token, getUserData, user } = useAuth();
  useEffect(() => {
    setAxiosDefault();
    if (token) {
      console.log(token);
      setToken(token);
      getUserData();
    }
  }, []);
  return (
    <React.Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <div className="grid relative bg-gray-100 dark:bg-gray-700 w-screen h-screen">
        {!token ? (
          <Routes>
            <Route element={<Global />}>
              <Route path="/login" element={<Home />} />
              <Route
                path="/signup"
                element={
                  // <SignupProvider>
                  <Signup />
                  // </SignupProvider>
                }
              />
              <Route path="*" element={<Redirect />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route element={<Global />}>
              <Route path="/login" element={<Redirect />} />
              <Route path="/signup" element={<Redirect />} />
            </Route>
          </Routes>
        )}
      </div>
    </React.Suspense>
  );
}

export default App;
