import { Button, InputNumber, Tag, Empty, Divider, message } from 'antd'
import {
  DeleteOutlined, ShoppingOutlined, ArrowLeftOutlined, CheckCircleOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, cartTotal, removeFromCart, updateQty, clearCart } = useCart()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const deliveryFee = cart.length > 0 ? 49 : 0
  const grandTotal = cartTotal + deliveryFee

  const handleCheckout = () => {
    messageApi.success({ content: '🎉 Order placed successfully! We\'ll bake it fresh for you.', duration: 3 })
    clearCart()
  }

  if (cart.length === 0) {
    return (
      <div style={{ background: '#FFF5E1', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        {contextHolder}
        <div style={{ fontSize: 72, marginBottom: 24 }}>🛒</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810', marginBottom: 12 }}>Your Cart is Empty</h2>
        <p style={{ color: '#8B5E3C', marginBottom: 32 }}>Looks like you haven't added anything yet.</p>
        <Button className="btn-primary" size="large" onClick={() => navigate('/products')} icon={<ShoppingOutlined />}>
          Start Shopping
        </Button>
      </div>
    )
  }

  return (
    <div style={{ background: '#FFF5E1', minHeight: '100vh' }}>
      {contextHolder}
      <div style={{ background: 'linear-gradient(135deg, #2C1810, #6B3E26)', padding: '48px 24px 40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#FFF5E1', fontSize: '2.2rem', margin: 0 }}>Your Cart</h1>
        <p style={{ color: 'rgba(255,245,225,0.75)', marginTop: 8 }}>{cart.length} item{cart.length !== 1 ? 's' : ''} selected</p>
      </div>

      <div className="container" style={{ padding: '40px 24px', maxWidth: 1000 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 32 }}
          className="cart-grid"
        >
          {/* Cart Items */}
          <div>
            {cart.map(item => (
              <div key={`${item.id}-${item.size}`} style={{
                background: '#fff', borderRadius: 16, padding: 20, marginBottom: 16,
                boxShadow: '0 4px 20px rgba(107,62,38,0.08)',
                display: 'flex', gap: 20, alignItems: 'center',
                transition: 'box-shadow 0.3s ease',
              }}
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(107,62,38,0.14)'}
              onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(107,62,38,0.08)'}
              >
                <div style={{ width: 90, height: 90, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.78rem', color: '#8B5E3C', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {item.category}
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810', fontSize: '1rem', margin: '4px 0 6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </h3>
                  {item.size && <Tag style={{ borderRadius: 6, background: '#F5E6C8', borderColor: '#E8C9A0', color: '#6B3E26', marginBottom: 8 }}>{item.size}</Tag>}
                  {item.message && <div style={{ fontSize: '0.78rem', color: '#8B5E3C', marginBottom: 4 }}>📝 "{item.message}"</div>}
                  <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#6B3E26', fontSize: '1.1rem' }}>
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F5E6C8', borderRadius: 10, padding: '4px 8px' }}>
                    <button
                      onClick={() => item.quantity > 1 ? updateQty(item.id, item.quantity - 1) : removeFromCart(item.id)}
                      style={{ width: 28, height: 28, border: 'none', borderRadius: 7, background: '#fff', cursor: 'pointer', fontWeight: 700, color: '#6B3E26', fontSize: '1rem' }}
                    >−</button>
                    <span style={{ width: 24, textAlign: 'center', fontWeight: 600, color: '#2C1810' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      style={{ width: 28, height: 28, border: 'none', borderRadius: 7, background: '#6B3E26', cursor: 'pointer', fontWeight: 700, color: '#fff', fontSize: '1rem' }}
                    >+</button>
                  </div>
                  <Button
                    danger type="text" size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => removeFromCart(item.id)}
                    style={{ fontSize: '0.78rem', color: '#CC4444' }}
                  >Remove</Button>
                </div>
              </div>
            ))}

            <Button
              type="text" onClick={clearCart}
              style={{ color: '#8B5E3C', marginTop: 8, fontSize: '0.85rem' }}
            >
              Clear all items
            </Button>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(107,62,38,0.10)', position: 'sticky', top: 90 }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810', fontSize: '1.2rem', marginBottom: 24 }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: '#5A3E35', fontSize: '0.92rem' }}>
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span style={{ fontWeight: 600, color: '#2C1810' }}>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: '#5A3E35', fontSize: '0.92rem' }}>
                <span>Delivery Fee</span>
                <span style={{ fontWeight: 600, color: '#2C1810' }}>₹{deliveryFee}</span>
              </div>
              <div style={{ background: '#FFF5E1', borderRadius: 8, padding: '8px 12px', fontSize: '0.82rem', color: '#8B5E3C', marginBottom: 20 }}>
                🚚 Free delivery on orders above ₹999
              </div>

              <Divider style={{ borderColor: '#F5E6C8', margin: '0 0 20px' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 700, color: '#2C1810' }}>Total</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: '#6B3E26' }}>₹{grandTotal.toLocaleString()}</span>
              </div>

              <Button
                type="primary" block size="large"
                className="btn-primary"
                onClick={handleCheckout}
                icon={<CheckCircleOutlined />}
                style={{ height: 52, fontWeight: 700, fontSize: '1rem' }}
              >
                Proceed to Checkout
              </Button>

              <Button
                block type="text"
                onClick={() => navigate('/products')}
                icon={<ArrowLeftOutlined />}
                style={{ marginTop: 12, color: '#8B5E3C', height: 40 }}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
