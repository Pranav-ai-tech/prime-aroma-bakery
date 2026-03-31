import { useState, useEffect } from 'react'
import {
  Layout, Menu, Card, Table, Tag, Avatar,
  Row, Col, Button, Statistic, Badge, Drawer,
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

/* ─── Static data ──────────────────────────────────────────── */
const STATUS_COLOR = { Delivered: 'success', Baking: 'processing', Pending: 'warning' }
const STATUS_ICON  = {
  Delivered: <CheckCircleOutlined />,
  Baking:    <FireOutlined />,
  Pending:   <ClockCircleOutlined />,
}

const METRICS = [
  { title: 'Total Orders',     value: 1247,  prefix: '',  icon: <ShoppingOutlined />,   color: '#6B3E26', bg: '#F5E6D0', trend: '+12%', up: true  },
  { title: 'Revenue (Mar)',    value: 96000, prefix: '₹', icon: <LineChartOutlined />,   color: '#2E7D32', bg: '#E8F5E9', trend: '+19%', up: true  },
  { title: 'Active Customers', value: 843,   prefix: '',  icon: <UserOutlined />,        color: '#1565C0', bg: '#E3F2FD', trend: '+8%',  up: true  },
  { title: 'Pending Orders',   value: 34,    prefix: '',  icon: <ClockCircleOutlined />, color: '#F57F17', bg: '#FFFDE7', trend: '-5%',  up: false },
]

const TABLE_COLS = [
  { title: 'Order ID',  dataIndex: 'id',       key: 'id',       render: v => <span style={{ fontWeight: 600, color: '#6B3E26' }}>{v}</span> },
  { title: 'Customer',  dataIndex: 'customer', key: 'customer' },
  { title: 'Item',      dataIndex: 'item',     key: 'item'     },
  { title: 'Amount',    dataIndex: 'amount',   key: 'amount',   render: v => <span style={{ fontWeight: 700, color: '#2C1810' }}>{v}</span> },
  { title: 'Date',      dataIndex: 'date',     key: 'date',     render: v => <span style={{ color: '#8B5E3C', fontSize: '0.87rem' }}>{v}</span> },
  {
    title: 'Status', dataIndex: 'status', key: 'status',
    render: s => (
      <Badge status={STATUS_COLOR[s]} text={
        <Tag icon={STATUS_ICON[s]}
          color={s === 'Delivered' ? '#6B3E26' : s === 'Baking' ? '#E65100' : '#B8860B'}
          style={{ borderRadius: 20, fontWeight: 600, border: 'none' }}
        >{s}</Tag>
      } />
    ),
  },
]

const NAV_ITEMS = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard'  },
  { key: 'orders',    icon: <ShoppingOutlined />,  label: 'Orders'     },
  { key: 'products',  icon: <AppstoreOutlined />,  label: 'Products'   },
  { key: 'customers', icon: <UserOutlined />,      label: 'Customers'  },
  { key: 'analytics', icon: <LineChartOutlined />, label: 'Analytics'  },
]

const BOTTOM_ITEMS = [
  { key: 'store',  icon: <AppstoreOutlined />, label: <Link to="/"  style={{ color: 'inherit' }}>View Store</Link> },
  { key: 'logout', icon: <LogoutOutlined />,   label: 'Logout' },
]

/* ─── Sidebar interior (reused in Sider + Drawer) ─────────── */
function SideMenu({ activeKey, onSelect, collapsed }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '22px 0' : '22px 20px',
        borderBottom: '1px solid rgba(255,245,225,0.1)',
        textAlign: collapsed ? 'center' : 'left',
      }}>
        <div style={{ fontSize: collapsed ? 26 : 22 }}>🥐</div>
        {!collapsed && (
          <>
            <div style={{ fontFamily: 'Playfair Display, serif', color: '#FFF5E1', fontWeight: 700, fontSize: '0.95rem', marginTop: 6, lineHeight: 1.2 }}>
              Prime Aroma
            </div>
            <div style={{ color: '#C4956A', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>
              Admin Portal
            </div>
          </>
        )}
      </div>

      {/* Main nav */}
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[activeKey]}
        onClick={e => onSelect(e.key)}
        items={NAV_ITEMS}
        style={{ background: 'transparent', border: 'none', marginTop: 8, flex: 1 }}
      />

      {/* Bottom nav */}
      <div style={{ borderTop: '1px solid rgba(255,245,225,0.1)' }}>
        <Menu
          mode="inline"
          theme="dark"
          items={BOTTOM_ITEMS}
          style={{ background: 'transparent', border: 'none' }}
        />
      </div>
    </div>
  )
}

/* ─── Main component ───────────────────────────────────────── */
export default function Dashboard() {
  const [collapsed,   setCollapsed]   = useState(false)
  const [drawerOpen,  setDrawerOpen]  = useState(false)
  const [isMobile,    setIsMobile]    = useState(false)
  const [activeKey,   setActiveKey]   = useState('dashboard')

  /* Sync isMobile with Ant's "lg" breakpoint (992 px) */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 991px)')
    const handle = (e) => {
      setIsMobile(e.matches)
      if (e.matches) setCollapsed(true)
      else           setDrawerOpen(false)
    }
    handle(mq)
    mq.addEventListener('change', handle)
    return () => mq.removeEventListener('change', handle)
  }, [])

  const handleSelect = (key) => {
    setActiveKey(key)
    setDrawerOpen(false)
  }

  const bestSellers = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 3)

  return (
    <Layout style={{ minHeight: '100vh' }}>

      {/* ── Desktop Sider — lives in normal document flow, no fixed/absolute ── */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          trigger={null}
          width={240}
          collapsedWidth={72}
          style={{
            background: '#2C1810',
            boxShadow: '2px 0 12px rgba(0,0,0,0.18)',
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            top: 0,
            left: 0,
          }}
        >
          <SideMenu activeKey={activeKey} onSelect={handleSelect} collapsed={collapsed} />
        </Sider>
      )}

      {/* ── Mobile Drawer ── */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="left"
        width={240}
        styles={{
          body:   { background: '#2C1810', padding: 0 },
          header: { display: 'none' },
        }}
      >
        <SideMenu activeKey={activeKey} onSelect={handleSelect} collapsed={false} />
      </Drawer>

      {/* ── Right-side Layout (header + content) — expands naturally ── */}
      <Layout style={{ background: '#F5EDE3' }}>

        {/* Header */}
        <Header style={{
          background: '#ffffff',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 12px rgba(107,62,38,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 99,
          height: 64,
          lineHeight: 'normal',
          gap: 12,
        }}>
          {/* Left: toggle + page title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 18, color: '#6B3E26' }} />}
              onClick={() => isMobile ? setDrawerOpen(true) : setCollapsed(c => !c)}
              style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#2C1810', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: 1.25 }}>
                {NAV_ITEMS.find(m => m.key === activeKey)?.label ?? 'Dashboard'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#8B5E3C' }}>Prime Aroma Foods Bakery</div>
            </div>
          </div>

          {/* Right: admin info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div style={{ textAlign: 'right', lineHeight: 1.3 }}>
              <div style={{ fontWeight: 600, color: '#2C1810', fontSize: '0.88rem' }}>Admin User</div>
              <div style={{ color: '#8B5E3C', fontSize: '0.72rem' }} className="hide-xs">admin@primearoma.in</div>
            </div>
            <Avatar size={36} style={{ background: '#6B3E26', fontFamily: 'Playfair Display, serif', cursor: 'pointer', flexShrink: 0 }}>A</Avatar>
          </div>
        </Header>

        {/* Content */}
        <Content style={{ padding: 24, minHeight: 'calc(100vh - 64px)', overflow: 'auto' }}>

          <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}>

            {/* ── Metric Cards ── */}
            <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
              {METRICS.map(m => (
                <Col key={m.title} xs={24} sm={12} md={12} lg={6}>
                  <Card
                    className="hover-card"
                    style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.08)', height: '100%' }}
                    bodyStyle={{ padding: 20 }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: m.color }}>
                        {m.icon}
                      </div>
                      <Tag
                        color={m.up ? 'success' : 'error'}
                        icon={m.up ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        style={{ borderRadius: 20, fontWeight: 600, border: 'none' }}
                      >
                        {m.trend}
                      </Tag>
                    </div>
                    <Statistic
                      title={<span style={{ color: '#8B5E3C', fontSize: '0.83rem', fontWeight: 500 }}>{m.title}</span>}
                      value={m.value}
                      prefix={m.prefix}
                      valueStyle={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#2C1810', fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)' }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            {/* ── Charts ── */}
            <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
              <Col xs={24} lg={16}>
                <Card
                  title={<span style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810' }}>Revenue Overview</span>}
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
                  title={<span style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810' }}>Orders</span>}
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
                  title={<span style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810' }}>Recent Orders</span>}
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
                  title={<span style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810' }}>🏆 Best Sellers</span>}
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

          </div>{/* /maxWidth container */}
        </Content>
      </Layout>

      <style>{`
        .ant-layout            { overflow: hidden; }
        .ant-layout-sider      { transition: width 0.2s !important; }
        .ant-table-thead > tr > th { background: #FFF5E1 !important; color: #6B3E26 !important; font-weight: 600; }
        .ant-table-row:hover > td  { background: #FFF5E1 !important; }
        .ant-menu-dark .ant-menu-item-selected { background: rgba(255,245,225,0.15) !important; }
        .ant-menu-dark .ant-menu-item:hover    { background: rgba(255,245,225,0.10) !important; }
        .ant-layout-header { line-height: normal !important; }
        @media (max-width: 480px) { .hide-xs { display: none !important; } }
      `}</style>
    </Layout>
  )
}
