import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Dashboard has its own layout (no navbar/footer) */}
          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* All public pages share Navbar + Footer */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/"             element={<Home />} />
                    <Route path="/products"     element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart"         element={<Cart />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
