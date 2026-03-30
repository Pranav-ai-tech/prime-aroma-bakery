import { useState, useEffect, useMemo } from 'react'
import { Row, Col, Input, Select, Slider, Empty, Button, Tag, Divider } from 'antd'
import { SearchOutlined, FilterOutlined, AppstoreOutlined } from '@ant-design/icons'
import ProductCard from '../components/ProductCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { PRODUCTS, CATEGORIES } from '../data/products'
import { useLocation } from 'react-router-dom'

const { Option } = Select

export default function Products() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const initialCat = query.get('category') || 'All'

  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState(initialCat)
  const [priceRange, setPriceRange] = useState([0, 1200])
  const [loading, setLoading]     = useState(true)
  const [sortBy, setSortBy]       = useState('default')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  // Re-apply category filter when URL changes
  useEffect(() => {
    const q = new URLSearchParams(location.search)
    setCategory(q.get('category') || 'All')
  }, [location.search])

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]
    if (search)        list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    if (category !== 'All') list = list.filter(p => p.category === category)
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (sortBy === 'price-asc')  list.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating')     list.sort((a, b) => b.rating - a.rating)
    return list
  }, [search, category, priceRange, sortBy])

  return (
    <div style={{ background: '#FFF5E1', minHeight: '100vh' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #2C1810 0%, #6B3E26 100%)',
        padding: '56px 24px 48px',
        textAlign: 'center',
      }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#FFF5E1', fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: 12 }}>
          Our Bakery Menu
        </h1>
        <p style={{ color: 'rgba(255,245,225,0.8)', fontSize: '1rem', margin: 0 }}>
          {PRODUCTS.length} freshly baked items waiting for you
        </p>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Filter Bar */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '20px 24px',
          boxShadow: '0 4px 20px rgba(107,62,38,0.10)', marginBottom: 32,
          display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center',
        }}>
          <Input
            prefix={<SearchOutlined style={{ color: '#8B5E3C' }} />}
            placeholder="Search baked goods…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: '1 1 220px', borderRadius: 12, height: 44 }}
            allowClear
          />

          <Select
            value={category}
            onChange={setCategory}
            style={{ flex: '0 1 160px', height: 44 }}
            dropdownStyle={{ borderRadius: 12 }}
          >
            {CATEGORIES.map(c => <Option key={c} value={c}>{c}</Option>)}
          </Select>

          <Select
            value={sortBy}
            onChange={setSortBy}
            style={{ flex: '0 1 180px', height: 44 }}
            dropdownStyle={{ borderRadius: 12 }}
          >
            <Option value="default">Sort: Default</Option>
            <Option value="price-asc">Price: Low → High</Option>
            <Option value="price-desc">Price: High → Low</Option>
            <Option value="rating">Highest Rated</Option>
          </Select>

          <div style={{ flex: '0 1 240px' }}>
            <div style={{ fontSize: '0.8rem', color: '#8B5E3C', marginBottom: 4, fontWeight: 500 }}>
              Price: ₹{priceRange[0]} – ₹{priceRange[1]}
            </div>
            <Slider
              range
              min={0} max={1200} step={50}
              value={priceRange}
              onChange={setPriceRange}
              trackStyle={[{ background: '#6B3E26' }]}
              handleStyle={[{ borderColor: '#6B3E26' }, { borderColor: '#6B3E26' }]}
            />
          </div>

          {/* Active filters */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: '1 1 auto' }}>
            {category !== 'All' && (
              <Tag closable color="#6B3E26" onClose={() => setCategory('All')}>{category}</Tag>
            )}
            {search && (
              <Tag closable color="#8B5E3C" onClose={() => setSearch('')}>"{search}"</Tag>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span style={{ color: '#8B5E3C', fontSize: '1rem' }}>
                  No products match your filters
                </span>
              }
            >
              <Button className="btn-primary" onClick={() => { setSearch(''); setCategory('All'); setPriceRange([0, 1200]) }}>
                Clear Filters
              </Button>
            </Empty>
          </div>
        ) : (
          <>
            <div style={{ color: '#8B5E3C', fontSize: '0.88rem', marginBottom: 16 }}>
              Showing <strong>{filtered.length}</strong> item{filtered.length !== 1 ? 's' : ''}
            </div>
            <Row gutter={[24, 24]}>
              {filtered.map(p => (
                <Col key={p.id} xs={24} sm={12} md={8} lg={6}>
                  <ProductCard product={p} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    </div>
  )
}
