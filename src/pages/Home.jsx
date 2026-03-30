import { useState, useEffect } from 'react'
import { Button, Row, Col, Card, Rate, Avatar } from 'antd'
import {
  ArrowRightOutlined, CheckCircleFilled,
  StarFilled, RightOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { PRODUCTS, TESTIMONIALS, WHY_CHOOSE_US } from '../data/products'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&q=85'

const CATEGORIES = [
  { name: 'Cakes',     emoji: '🎂', bg: '#FCE8D5', desc: 'Celebration & custom cakes' },
  { name: 'Pastries',  emoji: '🥐', bg: '#F5E6D0', desc: 'Flaky, buttery classics'    },
  { name: 'Breads',    emoji: '🍞', bg: '#EDE0CC', desc: 'Artisan sourdough & more'   },
]

export default function Home() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  // Auto-cycle testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000)
    return () => clearInterval(t)
  }, [])

  const featured = PRODUCTS.slice(0, 6)

  return (
    <div style={{ background: '#FFF5E1' }}>

      {/* ─── HERO ─────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transform: 'scale(1.04)',
          transition: 'transform 10s ease',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(44,24,16,0.75) 0%, rgba(107,62,38,0.45) 60%, rgba(0,0,0,0.2) 100%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '0 24px' }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,245,225,0.18)', backdropFilter: 'blur(8px)',
              borderRadius: 100, padding: '6px 18px', marginBottom: 24,
              border: '1px solid rgba(255,245,225,0.3)',
            }}>
              <span style={{ color: '#FBA91A', fontSize: 14 }}>★</span>
              <span style={{ color: '#FFF5E1', fontSize: '0.85rem', fontWeight: 500 }}>
                Chennai's #1 Rated Artisan Bakery
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 800,
              color: '#FFF5E1',
              lineHeight: 1.12,
              marginBottom: 24,
            }}>
              Freshly Baked<br />
              <span style={{ color: '#FDDCB5' }}>Happiness</span>
            </h1>

            <p style={{
              color: 'rgba(255,245,225,0.85)',
              fontSize: '1.15rem',
              lineHeight: 1.8,
              marginBottom: 40,
              maxWidth: 480,
            }}>
              Artisan breads, decadent cakes, and flaky pastries — crafted with love from the finest ingredients, delivered fresh to your door.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Button
                size="large"
                className="btn-primary"
                icon={<ShoppingCartIcon />}
                onClick={() => navigate('/products')}
                style={{ height: 54, fontSize: '1rem', paddingLeft: 28, paddingRight: 28 }}
              >
                Order Now
              </Button>
              <Button
                size="large"
                className="btn-outline"
                icon={<ArrowRightOutlined />}
                onClick={() => navigate('/products')}
                style={{
                  height: 54, fontSize: '1rem',
                  background: 'rgba(255,245,225,0.15) !important',
                  borderColor: 'rgba(255,245,225,0.7) !important',
                  color: '#FFF5E1 !important',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Explore Menu
              </Button>
            </div>

            {/* Stats strip */}
            <div style={{ display: 'flex', gap: 40, marginTop: 56, flexWrap: 'wrap' }}>
              {[
                { value: '10K+', label: 'Happy Customers' },
                { value: '50+',  label: 'Unique Recipes'  },
                { value: '4.9★', label: 'Average Rating'  },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, color: '#FDDCB5', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ color: 'rgba(255,245,225,0.7)', fontSize: '0.82rem', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
          <div style={{ width: 24, height: 40, border: '2px solid rgba(255,245,225,0.5)', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <div style={{ width: 4, height: 8, background: 'rgba(255,245,225,0.8)', borderRadius: 2, animation: 'scrollPulse 1.8s infinite' }} />
          </div>
        </div>
        <style>{`@keyframes scrollPulse { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(8px);opacity:0.4} }`}</style>
      </section>

      {/* ─── CATEGORIES ───────────────────────────── */}
      <section className="section" style={{ background: '#FFF5E1' }}>
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">From celebration cakes to everyday breads — we've got every craving covered.</p>

          <Row gutter={[24, 24]} justify="center">
            {CATEGORIES.map(cat => (
              <Col key={cat.name} xs={24} sm={8} lg={6}>
                <div
                  className="hover-card"
                  onClick={() => navigate(`/products?category=${cat.name}`)}
                  style={{
                    background: cat.bg, borderRadius: 20, padding: '40px 24px',
                    textAlign: 'center', cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(107,62,38,0.10)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ fontSize: 56, marginBottom: 16, lineHeight: 1 }}>{cat.emoji}</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#2C1810', marginBottom: 8 }}>{cat.name}</h3>
                  <p style={{ color: '#8B5E3C', fontSize: '0.88rem', margin: 0 }}>{cat.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ───────────────────── */}
      <section className="section" style={{ background: '#F9EDD5' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 6 }}>Featured Bakes</h2>
              <p style={{ color: '#8B5E3C', margin: 0 }}>Handpicked favourites — fresh out of the oven</p>
            </div>
            <Button
              type="text"
              icon={<RightOutlined />}
              onClick={() => navigate('/products')}
              style={{ color: '#6B3E26', fontWeight: 600 }}
            >
              View All
            </Button>
          </div>

          {loading ? (
            <LoadingSkeleton count={6} />
          ) : (
            <Row gutter={[24, 24]}>
              {featured.map(p => (
                <Col key={p.id} xs={24} sm={12} md={8} lg={8}>
                  <ProductCard product={p} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </section>

      {/* ─── WHY CHOOSE US ──────────────────────── */}
      <section className="section" style={{ background: '#6B3E26' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: '#FFF5E1' }}>Why Choose Us?</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,245,225,0.75)' }}>
            We're not just a bakery — we're a promise of quality.
          </p>

          <Row gutter={[32, 32]}>
            {WHY_CHOOSE_US.map((item, i) => (
              <Col key={i} xs={24} sm={12} lg={6}>
                <div style={{
                  background: 'rgba(255,245,225,0.10)', borderRadius: 16, padding: 32,
                  textAlign: 'center', border: '1px solid rgba(255,245,225,0.2)',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,245,225,0.18)'; e.currentTarget.style.transform = 'translateY(-6px)' }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,245,225,0.10)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: 44, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#FDDCB5', marginBottom: 10, fontSize: '1.1rem' }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,245,225,0.72)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────── */}
      <section className="section" style={{ background: '#FFF5E1' }}>
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Real reviews from real food lovers</p>

          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{
              background: '#fff', borderRadius: 20, padding: 40,
              boxShadow: '0 8px 40px rgba(107,62,38,0.12)',
              textAlign: 'center', transition: 'all 0.5s ease',
            }}>
              <Avatar
                size={72}
                style={{ background: '#6B3E26', fontSize: '1.3rem', fontWeight: 700, marginBottom: 20, fontFamily: 'Playfair Display, serif' }}
              >
                {TESTIMONIALS[activeTestimonial].avatar}
              </Avatar>
              <div style={{ marginBottom: 20 }}>
                {[...Array(5)].map((_, i) => <StarFilled key={i} style={{ color: '#FBA91A', fontSize: 16, marginRight: 2 }} />)}
              </div>
              <p style={{
                fontSize: '1.05rem', lineHeight: 1.8, color: '#4A2A18',
                fontStyle: 'italic', marginBottom: 24,
                fontFamily: 'Playfair Display, serif',
              }}>
                "{TESTIMONIALS[activeTestimonial].text}"
              </p>
              <div style={{ fontWeight: 600, color: '#2C1810', fontSize: '0.95rem' }}>{TESTIMONIALS[activeTestimonial].name}</div>
              <div style={{ color: '#8B5E3C', fontSize: '0.82rem' }}>{TESTIMONIALS[activeTestimonial].role}</div>
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? 24 : 8, height: 8,
                    borderRadius: 4, border: 'none', cursor: 'pointer',
                    background: i === activeTestimonial ? '#6B3E26' : '#C4956A',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #4A2A18 0%, #6B3E26 50%, #8B5E3C 100%)',
        padding: '72px 24px', textAlign: 'center',
      }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#FFF5E1', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginBottom: 16 }}>
          Ready to Indulge?
        </h2>
        <p style={{ color: 'rgba(255,245,225,0.8)', fontSize: '1.05rem', marginBottom: 36, maxWidth: 440, margin: '0 auto 36px' }}>
          Browse our full menu and get fresh bakery delivered today.
        </p>
        <Button
          size="large"
          className="btn-primary"
          onClick={() => navigate('/products')}
          style={{ height: 52, fontSize: '1rem', background: '#FFF5E1 !important', color: '#6B3E26 !important', borderColor: '#FFF5E1 !important', fontWeight: 700 }}
        >
          Shop Now →
        </Button>
      </section>
    </div>
  )
}

function ShoppingCartIcon() {
  return <span style={{ marginRight: 4 }}>🛒</span>
}
