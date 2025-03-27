import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/IngredientsSlice';
import { useDispatch } from '../../services/store';
import { getUser } from '../../services/slices/userSlice';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());

    const token = localStorage.getItem('refreshToken');
    if (token) {
      dispatch(getUser());
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='заказ по номеру' onClose={goBack}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={goBack}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='заказ по номеру из профеля' onClose={goBack}>
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
