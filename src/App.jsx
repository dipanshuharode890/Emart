import { Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './component/navbar/Navbar';
import Index from './component/pages/Index';
import ProductDetails from './component/pages/ProductDetails';
import Wishlist from './component/pages/Wishlist';
import Cart from './component/pages/Cart';
import Checkout from './component/pages/Checkout';
import Shop from './component/pages/Shop';
import Signup from './component/pages/Signup';
import Login from './component/pages/Login';
import ForgetPassword from './component/pages/ForgetPassword';
import Footer from './component/footer/Footer';
import About from './component/pages/About';
import Blog from './component/pages/Blog';


function App() {

  return (
    <>
      <Navbar />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgetPassword />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/about' element={<About />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
