import { useState, useEffect } from 'react'
import {
  Layout, Menu, Card, Table, Tag, Avatar, Row, Col,
  Button, Statistic, Badge, Drawer,
} from 'antd'
import {
  DashboardOutlined, ShoppingOutlined, AppstoreOutlined, UserOutlined,
  LineChartOutlined, LogoutOutlined, ArrowUpOutlined, ArrowDownOutlined,
  CheckCircleOutlined, ClockCircleOutlined, FireOutlined, MenuOutlined,
} from '@ant-design/icons'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts'
import { Link } from 'react-router-dom'
import { DASHBOARD_ORDERS, REVENUE_DATA, PRODUCTS } from '../data/products'

const { Sider, Content, Header } = Layout

const SIDER_WIDTH = 240

const STATUS_COLOR = {
  Delivered: 'success',
  Baking:    'processing',
  Pending:   'warning',
}
const STATUS_ICON = {
  Delivered: <CheckCircleOutlined />,
  Baking:    <FireOutlined />,
  Pending:   <ClockCircleOutlined />,
}

const METRICS = [
  { title: 'Total Orders',     value: 1247,  prefix: '',  icon: <ShoppingOutlined />,     color: '#6B3E26', bg: '#F5E6D0', trend: '+12%', up: true  },
  { title: 'Revenue (Mar)',    value: 96000, prefix: '₹', icon: <LineChartOutlined />,     color: '#2E7D32', bg: '#E8F5E9', trend: '+19%', up: true  },
  { title: 'Active Customers', value: 843,   prefix: '',  icon: <UserOutlined />,          color: '#1565C0', bg: '#E3F2FD', trend: '+8%',  up: true  },
  { title: 'Pending Orders',   value: 34,    prefix: '',  icon: <ClockCircleOutlined />,   color: '#F57F17', bg: '#FFFDE7', trend: '-5%',  up: false },
]

const TABLE_COLS = [
  { title: 'Order ID',  dataIndex: 'id',       key: 'id',       render: v => <span style={{ fontWeight: 600, color: '#6B3E26' }}>{v}</span> },
  { title: 'Customer',  dataIndex: 'customer', key: 'customer' },
  { title: 'Item',      dataIndex: 'item',     key: 'item'  },
  { title: 'Amount',    dataIndex: 'amount',   key: 'amount',   render: v => <span style={{ fontWeight: 700, color: '#2C1810' }}>{v}</span> },
  { title: 'Date',      dataIndex: 'date',     key: 'date',     render: v => <span style={{ color: '#8B5E3C', fontSize: '0.87rem' }}>{v}</span> },
  {
    title: 'Status', dataIndex: 'status', key: 'status',
    render: s => (
      <Badge status={STATUS_COLOR[s]} text={
        <Tag
          icon={STATUS_ICON[s]}
          color={s === 'Delivered' ? '#6B3E26' : s === 'Baking' ? '#E65100' : '#B8860B'}
          style={{ borderRadius: 20, fontWeight: 600, border: 'none' }}
        >{s}</Tag>
      } />
    ),
  },
]

const MENU_ITEMS = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard'  },
  { key: 'orders',    icon: <ShoppingOutlined />,  label: 'Orders'     },
  { key: 'products',  icon: <AppstoreOutlined />,  label: 'Products'   },
  { key: 'customers', icon: <UserOutlined />,      label: 'Customers'  },
  { key: 'analytics', icon: <LineChartOutlined />, label: 'Analytics'  },
]

const BOTTOM_ITEMS = [
  { key: 'store',  icon: <AppstoreOutlined />, label: <Link to="/" style={{ color: 'inherit' }}>View Store</Link> },
  { key: 'logout', icon: <LogoutOutlined />,   label: 'Logout' },
]

/* Sidebar content — shared between Sider and Drawer */
function SidebarContent({ activeKey, setActiveKey, collapsed }) {
  return (
    <>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '24px 0' : '24px 20px',
        borderBottom: '1px solid rgba(255,245,225,0.1)',
        textAlign: collapsed ? 'center' : 'left',
        minHeight: 80,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{ fontSize: collapsed ? 28 : 22 }}>🥐</div>
        {!collapsed && (
          <>
            <div style={{ fontFamily: 'Playfair Display, serif', color: '#FFF5E1', fontWeight: 700, fontSize: '0.95rem', marginTop: 6 }}>
              Prime Aroma
            </div>
            <div style={{ color: '#C4956A', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Admin Portal
            </div>
          </>
        )}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[activeKey]}
        onClick={e => setActiveKey(e.key)}
        items={MENU_ITEMS}
        style={{ background: 'transparent', border: 'none', marginTop: 8, flex: 1 }}
        theme="dark"
      />

      {/* Bottom nav */}
      <div style={{ borderTop: '1px solid rgba(255,245,225,0.1)', padding: '8px 0', marginTop: 'auto' }}>
        <Menu
          mode="inline"
          items={BOTTOM_ITEMS}
          style={{ background: 'transparent', border: 'none' }}
          theme="dark"
        />
      </div>
    </>
  )
}

export default function Dashboard() {
  const [collapsed, setCollapsed]     = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [isMobile, setIsMobile]       = useState(false)
  const [activeKey, setActiveKey]     = useState('dashboard')

  /* Detect mobile breakpoint (< 992px = lg) */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 991px)')
    const handler = (e) => {
      setIsMobile(e.matches)
      if (e.matches) setCollapsed(true)
      else { setCollapsed(false); setMobileOpen(false) }
    }
    handler(mq)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const bestSellers = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 3)

  /* How much margin-left the main content needs */
  const contentMargin = isMobile ? 0 : collapsed ? 80 : SIDER_WIDTH

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5EDE3', overflow: 'hidden' }}>

      {/* ── DESKTOP SIDER ── */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={SIDER_WIDTH}
          collapsedWidth={80}
          trigger={null}
          style={{
            background: '#2C1810',
            boxShadow: '4px 0 24px rgba(0,0,0,0.2)',
            position: 'fixed',
            left: 0, top: 0, bottom: 0,
            zIndex: 200,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
          }}
        >
          <SidebarContent activeKey={activeKey} setActiveKey={setActiveKey} collapsed={collapsed} />
        </Sider>
      )}

      {/* ── MOBILE DRAWER ── */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        placement="left"
        width={SIDER_WIDTH}
        styles={{ body: { background: '#2C1810', padding: 0, display: 'flex', flexDirection: 'column' }, header: { display: 'none' } }}
        style={{ zIndex: 1100 }}
      >
        <SidebarContent activeKey={activeKey} setActiveKey={e => { setActiveKey(e); setMobileOpen(false) }} collapsed={false} />
      </Drawer>

      {/* ── MAIN LAYOUT ── */}
      <Layout
        style={{
          marginLeft: contentMargin,
          transition: 'margin-left 0.2s ease',
          background: '#F5EDE3',
          minHeight: '100vh',
          width: `calc(100% - ${contentMargin}px)`,
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Top Header */}
        <Header style={{
          background: '#fff',
          padding: '0 16px 0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 12px rgba(107,62,38,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: 64,
          lineHeight: 'normal',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Hamburger — mobile shows Drawer, desktop collapses Sider */}
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 20, color: '#6B3E26' }} />}
              onClick={() => isMobile ? setMobileOpen(true) : setCollapsed(c => !c)}
              style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#2C1810', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', lineHeight: 1.2 }}>
                {MENU_ITEMS.find(m => m.key === activeKey)?.label}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#8B5E3C' }}>Prime Aroma Foods Bakery</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 600, color: '#2C1810', fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', lineHeight: 1.2 }}>Admin User</span>
              <span style={{ color: '#8B5E3C', fontSize: '0.72rem', display: 'none' }} className="admin-email">admin@primearoma.in</span>
            </div>
            <Avatar size={38} style={{ background: '#6B3E26', fontFamily: 'Playfair Display, serif', cursor: 'pointer', flexShrink: 0 }}>A</Avatar>
          </div>
        </Header>

        <Content style={{ padding: 'clamp(16px, 3vw, 32px)', minHeight: 'calc(100vh - 64px)', overflow: 'auto' }}>

          {/* ── Metric Cards ── */}
          <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
            {METRICS.map(m => (
              <Col key={m.title} xs={24} sm={12} md={12} lg={6}>
                <Card
                  className="hover-card"
                  style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.08)', height: '100%' }}
                  bodyStyle={{ padding: 20 }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: m.color, flexShrink: 0 }}>
                      {m.icon}
                    </div>
                    <Tag
                      color={m.up ? 'success' : 'error'}
                      style={{ borderRadius: 20, fontWeight: 600, border: 'none' }}
                      icon={m.up ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    >
                      {m.trend}
                    </Tag>
                  </div>
                  <Statistic
                    title={<span style={{ color: '#8B5E3C', fontSize: '0.83rem', fontWeight: 500 }}>{m.title}</span>}
                    value={m.value}
                    prefix={m.prefix}
                    valueStyle={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#2C1810', fontSize: 'clamp(1.3rem, 3vw, 1.7rem)' }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          {/* ── Charts Row ── */}
          <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
            <Col xs={24} lg={16}>
              <Card
                title={<span style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810', fontSize: '1rem' }}>Revenue Overview</span>}
                extra={<Tag color="#6B3E26" style={{ borderRadius: 20 }}>Last 6 Months</Tag>}
                style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.08)', height: '100%' }}
                bodyStyle={{ paddingTop: 8 }}
              >
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={REVENUE_DATA} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F5E6C8" />
                    <XAxis dataKey="month" tick={{ fill: '#8B5E3C', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} tick={{ fill: '#8B5E3C', fontSize: 11 }} axisLine={false} tickLine={false} width={48} />
                    <Tooltip
                      formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']}
                      contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.15)' }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#6B3E26" strokeWidth={3} dot={{ fill: '#6B3E26', r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card
                title={<span style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810', fontSize: '1rem' }}>Orders</span>}
                extra={<Tag color="#8B5E3C" style={{ borderRadius: 20 }}>Monthly</Tag>}
                style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.08)', height: '100%' }}
                bodyStyle={{ paddingTop: 8 }}
              >
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 8, left: -24, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F5E6C8" />
                    <XAxis dataKey="month" tick={{ fill: '#8B5E3C', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#8B5E3C', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.15)' }} />
                    <Bar dataKey="orders" fill="#C4956A" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* ── Orders Table + Best Sellers ── */}
          <Row gutter={[16, 16]}>
            <Col xs={24} xl={16}>
              <Card
                title={<span style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810', fontSize: '1rem' }}>Recent Orders</span>}
                extra={<Button type="text" style={{ color: '#6B3E26', fontWeight: 600, padding: 0 }}>View All →</Button>}
                style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.08)' }}
              >
                <Table
                  dataSource={DASHBOARD_ORDERS}
                  columns={TABLE_COLS}
                  pagination={{ pageSize: 5, size: 'small', showSizeChanger: false }}
                  rowKey="key"
                  size="middle"
                  scroll={{ x: 560 }}
                  rowClassName="order-row"
                />
              </Card>
            </Col>

            <Col xs={24} xl={8}>
              <Card
                title={<span style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810', fontSize: '1rem' }}>🏆 Best Sellers</span>}
                style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.08)', height: '100%' }}
              >
                {bestSellers.map((p, i) => (
                  <div key={p.id} style={{
                    display: 'flex', gap: 12, alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: i < bestSellers.length - 1 ? '1px solid #F5E6C8' : 'none',
                  }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                      <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: '#2C1810', fontSize: '0.87rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name}
                      </div>
                      <div style={{ color: '#8B5E3C', fontSize: '0.76rem' }}>{p.reviews} orders</div>
                    </div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#6B3E26', flexShrink: 0 }}>₹{p.price}</div>
                    <Tag style={{ borderRadius: 20, background: '#F5E6C8', border: 'none', color: '#6B3E26', fontWeight: 700, padding: '0 8px', flexShrink: 0 }}>
                      #{i + 1}
                    </Tag>
                  </div>
                ))}
              </Card>
            </Col>
          </Row>

        </Content>
      </Layout>

      <style>{`
        .ant-table-thead > tr > th { background: #FFF5E1 !important; color: #6B3E26 !important; font-weight: 600; }
        .ant-table-row:hover > td   { background: #FFF5E1 !important; }
        .ant-menu-dark .ant-menu-item-selected { background: rgba(255,245,225,0.15) !important; }
        .ant-menu-dark .ant-menu-item:hover    { background: rgba(255,245,225,0.10) !important; }
        .ant-layout-header { line-height: normal !important; }
        .ant-drawer-body   { display: flex; flex-direction: column; }
        @media (min-width: 576px) { .admin-email { display: flex !important; } }
        body { overflow-x: hidden; }
      `}</style>
    </div>
  )
}
