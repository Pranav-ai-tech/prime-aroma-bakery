import { useState } from 'react'
import {
  Row, Col, Button, InputNumber, Select, Input, Tag, Rate, Breadcrumb, message, Divider,
} from 'antd'
import {
  ShoppingCartOutlined, ArrowLeftOutlined, StarFilled, HeartOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

const { Option } = Select
const { TextArea } = Input

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [messageApi, contextHolder] = message.useMessage()

  const product = PRODUCTS.find(p => p.id === Number(id))
  const related = PRODUCTS.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3)

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')
  const [customMessage, setCustomMessage] = useState('')
  const [qty, setQty] = useState(1)
  const [zoomed, setZoomed] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px', background: '#FFF5E1', minHeight: '60vh' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🥐</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#4A2A18' }}>Product Not Found</h2>
        <Button className="btn-primary" onClick={() => navigate('/products')} style={{ marginTop: 20 }}>Back to Shop</Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize, message: customMessage, quantity: qty })
    messageApi.success({
      content: `${product.name} added to cart!`,
      icon: <CheckCircleOutlined style={{ color: '#6B3E26' }} />,
    })
  }

  return (
    <div style={{ background: '#FFF5E1', minHeight: '100vh' }}>
      {contextHolder}
      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: 24 }} items={[
          { title: <Link to="/" style={{ color: '#8B5E3C' }}>Home</Link> },
          { title: <Link to="/products" style={{ color: '#8B5E3C' }}>Shop</Link> },
          { title: <span style={{ color: '#2C1810', fontWeight: 500 }}>{product.name}</span> },
        ]} />

        <Row gutter={[48, 40]}>
          {/* ── Left: Image ─── */}
          <Col xs={24} lg={12}>
            <div
              style={{
                borderRadius: 20, overflow: 'hidden', position: 'relative',
                boxShadow: '0 16px 60px rgba(107,62,38,0.20)',
                cursor: 'zoom-in',
                aspectRatio: '4/3',
              }}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transform: zoomed ? 'scale(1.10)' : 'scale(1)',
                  transition: 'transform 0.6s ease',
                  display: 'block',
                }}
              />
              {product.badge && (
                <Tag color="#6B3E26" style={{
                  position: 'absolute', top: 16, left: 16,
                  borderRadius: 8, fontWeight: 600, border: 'none',
                  fontSize: '0.8rem', padding: '4px 14px',
                }}>
                  {product.badge}
                </Tag>
              )}
              <Button
                type="text"
                icon={<HeartOutlined style={{ fontSize: 20, color: wishlisted ? '#E84545' : '#fff' }} />}
                onClick={() => setWishlisted(w => !w)}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'rgba(0,0,0,0.3)', borderRadius: 50,
                  width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}
              />
            </div>

            {/* Thumbnail strip placeholder */}
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  width: 80, height: 64, borderRadius: 10, overflow: 'hidden',
                  border: i === 1 ? '2px solid #6B3E26' : '2px solid transparent',
                  opacity: i === 1 ? 1 : 0.55, cursor: 'pointer',
                }}>
                  <img src={product.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </Col>

          {/* ── Right: Details ─── */}
          <Col xs={24} lg={12}>
            <div style={{ fontSize: '0.82rem', color: '#8B5E3C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
              {product.category}
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: '#2C1810', marginBottom: 16, lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Rate disabled defaultValue={Math.round(product.rating)} style={{ fontSize: 16, color: '#FBA91A' }} />
              <span style={{ fontWeight: 700, color: '#2C1810' }}>{product.rating}</span>
              <span style={{ color: '#8B5E3C', fontSize: '0.85rem' }}>({product.reviews} reviews)</span>
            </div>

            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, color: '#6B3E26', marginBottom: 20 }}>
              ₹{product.price}
              <span style={{ fontSize: '0.9rem', color: '#8B5E3C', fontFamily: 'Inter, sans-serif', fontWeight: 400, marginLeft: 8 }}>
                / {product.sizes?.[0]}
              </span>
            </div>

            <Divider style={{ borderColor: '#F5E6C8', margin: '0 0 20px' }} />

            <p style={{ color: '#5A3E35', lineHeight: 1.8, fontSize: '0.97rem', marginBottom: 28 }}>
              {product.description}
            </p>

            {/* Tags */}
            <div style={{ marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {product.tags.map(t => (
                <Tag key={t} style={{ borderRadius: 20, background: '#F5E6C8', borderColor: '#E8C9A0', color: '#6B3E26', padding: '2px 12px' }}>
                  {t}
                </Tag>
              ))}
            </div>

            {/* Size selection */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontWeight: 600, color: '#2C1810', marginBottom: 8, fontSize: '0.9rem' }}>
                Select Size
              </label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: '8px 18px', borderRadius: 10,
                      border: selectedSize === s ? '2px solid #6B3E26' : '2px solid #E8C9A0',
                      background: selectedSize === s ? '#6B3E26' : '#fff',
                      color: selectedSize === s ? '#fff' : '#6B3E26',
                      fontWeight: 500, cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '0.88rem',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom message */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 600, color: '#2C1810', marginBottom: 8, fontSize: '0.9rem' }}>
                Custom Message <span style={{ fontWeight: 400, color: '#8B5E3C', fontSize: '0.82rem' }}>(optional)</span>
              </label>
              <TextArea
                placeholder="e.g. Happy Birthday Sarah! 🎂"
                value={customMessage}
                onChange={e => setCustomMessage(e.target.value)}
                rows={2}
                maxLength={80}
                showCount
                style={{ borderRadius: 12, borderColor: '#E8C9A0' }}
              />
            </div>

            {/* Qty + Add to Cart */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#2C1810', marginBottom: 8, fontSize: '0.9rem' }}>Quantity</label>
                <InputNumber
                  min={1} max={20}
                  value={qty}
                  onChange={v => setQty(v)}
                  style={{ width: 110, height: 48, borderRadius: 12, borderColor: '#E8C9A0', fontSize: '1rem' }}
                  controls
                />
              </div>
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                className="btn-primary"
                onClick={handleAddToCart}
                style={{ height: 52, flex: 1, minWidth: 180, fontSize: '1rem', fontWeight: 600, marginTop: 22 }}
              >
                Add to Cart — ₹{(product.price * qty).toLocaleString()}
              </Button>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'flex', gap: 16, marginTop: 28, flexWrap: 'wrap' }}>
              {['🌿 No Preservatives', '🚚 Same-Day Delivery', '✅ Freshness Guaranteed'].map(t => (
                <div key={t} style={{ fontSize: '0.82rem', color: '#8B5E3C', display: 'flex', alignItems: 'center', gap: 4 }}>{t}</div>
              ))}
            </div>
          </Col>
        </Row>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 32 }}>You Might Also Like</h2>
            <Row gutter={[24, 24]}>
              {related.map(p => (
                <Col key={p.id} xs={24} sm={12} md={8}>
                  <ProductCard product={p} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  )
}
