import { Card, Button, Tag, Rate } from 'antd'
import { ShoppingCartOutlined, StarFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, showAddToCart = true }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const handleAdd = (e) => {
    e.stopPropagation()
    addToCart({ ...product, quantity: 1 })
  }

  return (
    <Card
      className="hover-card"
      bodyStyle={{ padding: 0 }}
      style={{ overflow: 'hidden', cursor: 'pointer', border: 'none' }}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      {/* Image */}
      <div className="img-container">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        {product.badge && (
          <Tag
            color="#6B3E26"
            style={{
              position: 'absolute', top: 12, left: 12,
              borderRadius: 8, fontWeight: 600, border: 'none',
              fontSize: '0.75rem', padding: '2px 10px',
            }}
          >
            {product.badge}
          </Tag>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px 20px' }}>
        <div style={{ fontSize: '0.78rem', color: '#8B5E3C', fontWeight: 500, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {product.category}
        </div>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.05rem',
          fontWeight: 600,
          color: '#2C1810',
          marginBottom: 8,
          lineHeight: 1.3,
        }}>
          {product.name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
          <StarFilled style={{ color: '#FBA91A', fontSize: 13 }} />
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#2C1810' }}>{product.rating}</span>
          <span style={{ fontSize: '0.78rem', color: '#8B5E3C' }}>({product.reviews})</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, color: '#6B3E26' }}>
              ₹{product.price}
            </span>
          </div>
          {showAddToCart && (
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              className="btn-primary"
              style={{ height: 38, padding: '0 16px', fontSize: '0.85rem' }}
              onClick={handleAdd}
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
