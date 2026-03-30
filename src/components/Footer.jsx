import { Row, Col, Divider } from 'antd'
import { Link } from 'react-router-dom'
import {
  InstagramOutlined, FacebookOutlined, TwitterOutlined,
  MailOutlined, PhoneOutlined, EnvironmentOutlined,
} from '@ant-design/icons'

export default function Footer() {
  return (
    <footer style={{ background: '#2C1810', color: '#E8D5C4', paddingTop: 64, paddingBottom: 32 }}>
      <div className="container">
        <Row gutter={[48, 40]}>
          {/* Brand */}
          <Col xs={24} sm={12} lg={6}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, color: '#FFF5E1', marginBottom: 4 }}>
                🥐 Prime Aroma
              </div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4956A', marginBottom: 16 }}>
                Foods Bakery
              </div>
            </div>
            <p style={{ color: '#C4956A', lineHeight: 1.7, fontSize: '0.92rem' }}>
              Crafting happiness one loaf at a time. Premium artisan bakery delivering freshly baked goods since 2018.
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
              {[InstagramOutlined, FacebookOutlined, TwitterOutlined].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 38, height: 38, borderRadius: 10, background: 'rgba(255,245,225,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#E8D5C4', fontSize: 18, transition: 'all 0.3s',
                }}
                onMouseOver={e => {e.currentTarget.style.background = '#6B3E26'; e.currentTarget.style.color = '#fff'}}
                onMouseOut={e => {e.currentTarget.style.background = 'rgba(255,245,225,0.1)'; e.currentTarget.style.color = '#E8D5C4'}}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={12} sm={12} lg={5}>
            <h4 style={{ color: '#FFF5E1', fontFamily: 'Playfair Display, serif', marginBottom: 20, fontSize: '1.05rem' }}>Quick Links</h4>
            {[
              { label: 'Home', to: '/' },
              { label: 'Shop All', to: '/products' },
              { label: 'Cakes', to: '/products?category=Cakes' },
              { label: 'Pastries', to: '/products?category=Pastries' },
              { label: 'Breads', to: '/products?category=Breads' },
            ].map(l => (
              <div key={l.label} style={{ marginBottom: 10 }}>
                <Link to={l.to} style={{ color: '#C4956A', fontSize: '0.92rem', transition: 'color 0.2s' }}
                  onMouseOver={e => e.target.style.color = '#FFF5E1'}
                  onMouseOut={e => e.target.style.color = '#C4956A'}
                >
                  {l.label}
                </Link>
              </div>
            ))}
          </Col>

          {/* Customer Care */}
          <Col xs={12} sm={12} lg={5}>
            <h4 style={{ color: '#FFF5E1', fontFamily: 'Playfair Display, serif', marginBottom: 20, fontSize: '1.05rem' }}>Customer Care</h4>
            {['FAQ', 'Delivery Policy', 'Returns & Refunds', 'Track Order', 'Contact Us'].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <a href="#" style={{ color: '#C4956A', fontSize: '0.92rem', transition: 'color 0.2s' }}
                  onMouseOver={e => e.target.style.color = '#FFF5E1'}
                  onMouseOut={e => e.target.style.color = '#C4956A'}
                >
                  {l}
                </a>
              </div>
            ))}
          </Col>

          {/* Contact */}
          <Col xs={24} sm={12} lg={8}>
            <h4 style={{ color: '#FFF5E1', fontFamily: 'Playfair Display, serif', marginBottom: 20, fontSize: '1.05rem' }}>Get In Touch</h4>
            {[
              { icon: <EnvironmentOutlined />, text: '42, Baker Street, Anna Nagar, Chennai – 600 040' },
              { icon: <PhoneOutlined />,      text: '+91 98765 43210' },
              { icon: <MailOutlined />,       text: 'hello@primearoma.in' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                <span style={{ color: '#C4956A', marginTop: 2 }}>{c.icon}</span>
                <span style={{ color: '#C4956A', fontSize: '0.9rem', lineHeight: 1.6 }}>{c.text}</span>
              </div>
            ))}
          </Col>
        </Row>

        <Divider style={{ borderColor: 'rgba(255,245,225,0.1)', margin: '40px 0 24px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ color: '#7A6055', fontSize: '0.85rem', margin: 0 }}>
            © 2026 Prime Aroma Foods Bakery. All rights reserved.
          </p>
          <p style={{ color: '#7A6055', fontSize: '0.85rem', margin: 0 }}>
            Made with 🧡 in Chennai, India
          </p>
        </div>
      </div>
    </footer>
  )
}
