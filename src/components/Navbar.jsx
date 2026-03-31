import { useState, useEffect } from 'react'
import { Layout, Menu, Badge, Button, Drawer } from 'antd'
import { ShoppingCartOutlined, HomeOutlined, AppstoreOutlined, DashboardOutlined, MenuOutlined } from '@ant-design/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const { Header } = Layout

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { cartCount } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentKey = location.pathname === '/'
    ? 'home'
    : location.pathname.startsWith('/products')
    ? 'products'
    : location.pathname.startsWith('/dashboard')
    ? 'dashboard'
    : ''

  const navItems = [
    { key: 'home',      label: 'Home',      icon: <HomeOutlined />,        path: '/' },
    { key: 'products',  label: 'Shop',      icon: <AppstoreOutlined />,    path: '/products' },
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />,   path: '/dashboard' },
  ]

  const menuItems = navItems.map(i => ({
    key: i.key,
    icon: i.icon,
    label: <Link to={i.path}>{i.label}</Link>,
  }))

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        background: scrolled ? 'rgba(255,245,225,0.96)' : '#FFF5E1',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(107,62,38,0.12)' : 'none',
        transition: 'all 0.3s ease',
        height: 64,
        minWidth: 0,
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
        <span style={{ fontSize: 22 }}>🥐</span>
        <div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', color: '#4A2A18', lineHeight: 1 }}>
            Prime Aroma
          </div>
          <div style={{ fontSize: '0.62rem', color: '#8B5E3C', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Foods Bakery
          </div>
        </div>
      </Link>

      {/* Desktop Menu */}
      <Menu
        mode="horizontal"
        selectedKeys={[currentKey]}
        items={menuItems}
        style={{
          background: 'transparent',
          border: 'none',
          flex: 1,
          justifyContent: 'center',
          fontWeight: 500,
          color: '#6B3E26',
          minWidth: 0,
          overflow: 'hidden',
        }}
        className="desktop-menu"
      />

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <Badge count={cartCount} className="cart-badge">
          <Button
            type="text"
            icon={<ShoppingCartOutlined style={{ fontSize: 22, color: '#6B3E26' }} />}
            onClick={() => navigate('/cart')}
            style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />
        </Badge>
        <Button
          type="primary"
          className="btn-primary desktop-order-btn"
          onClick={() => navigate('/products')}
          style={{ height: 38, padding: '0 18px', fontSize: '0.88rem' }}
        >
          Order Now
        </Button>
        {/* Mobile hamburger */}
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 20, color: '#6B3E26' }} />}
          className="mobile-menu-btn"
          onClick={() => setDrawerOpen(true)}
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={<span style={{ fontFamily: 'Playfair Display, serif', color: '#4A2A18' }}>🥐 Prime Aroma</span>}
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        bodyStyle={{ background: '#FFF5E1', padding: 0 }}
        headerStyle={{ background: '#FFF5E1', borderBottom: '1px solid #F5E6C8' }}
        width={260}
      >
        <Menu
          mode="inline"
          selectedKeys={[currentKey]}
          items={menuItems}
          style={{ background: 'transparent', border: 'none', fontWeight: 500 }}
          onClick={() => setDrawerOpen(false)}
        />
        <div style={{ padding: '16px 24px' }}>
          <Button
            type="primary"
            className="btn-primary"
            block
            onClick={() => { navigate('/products'); setDrawerOpen(false) }}
            style={{ height: 44, fontSize: '0.95rem' }}
          >
            Order Now
          </Button>
        </div>
      </Drawer>

      <style>{`
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .desktop-order-btn { display: none !important; }
        }
        .ant-menu-horizontal { box-shadow: none !important; }
        .ant-menu-horizontal .ant-menu-item { color: #6B3E26 !important; font-weight: 500; }
        .ant-menu-horizontal .ant-menu-item::after { border-bottom-color: #6B3E26 !important; }
        .ant-layout-header { line-height: normal !important; }
      `}</style>
    </Header>
  )
}
