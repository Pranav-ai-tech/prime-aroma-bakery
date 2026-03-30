import { useState } from 'react'
import {
  Layout, Menu, Card, Table, Tag, Avatar, Row, Col, Button, Statistic, Badge,
} from 'antd'
import {
  DashboardOutlined, ShoppingOutlined, AppstoreOutlined, UserOutlined,
  LineChartOutlined, LogoutOutlined, ArrowUpOutlined, ArrowDownOutlined,
  CheckCircleOutlined, ClockCircleOutlined, FireOutlined,
} from '@ant-design/icons'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from 'recharts'
import { Link, useNavigate } from 'react-router-dom'
import { DASHBOARD_ORDERS, REVENUE_DATA, PRODUCTS } from '../data/products'

const { Sider, Content, Header } = Layout

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
  { title: 'Total Orders',      value: 1247, suffix: '',    icon: <ShoppingOutlined />, color: '#6B3E26', bg: '#F5E6D0', trend: '+12%', up: true },
  { title: 'Revenue (Mar)',     value: 96000, prefix: '₹',  icon: <LineChartOutlined />, color: '#2E7D32', bg: '#E8F5E9', trend: '+19%', up: true },
  { title: 'Active Customers',  value: 843,  suffix: '',    icon: <UserOutlined />,     color: '#1565C0', bg: '#E3F2FD', trend: '+8%',  up: true },
  { title: 'Pending Orders',    value: 34,   suffix: '',    icon: <ClockCircleOutlined />, color: '#F57F17', bg: '#FFFDE7', trend: '-5%', up: false },
]

const TABLE_COLS = [
  { title: 'Order ID',  dataIndex: 'id',       key: 'id',   render: v => <span style={{ fontWeight: 600, color: '#6B3E26' }}>{v}</span> },
  { title: 'Customer',  dataIndex: 'customer', key: 'customer' },
  { title: 'Item',      dataIndex: 'item',     key: 'item'  },
  { title: 'Amount',    dataIndex: 'amount',   key: 'amount', render: v => <span style={{ fontWeight: 700, color: '#2C1810' }}>{v}</span> },
  { title: 'Date',      dataIndex: 'date',     key: 'date', render: v => <span style={{ color: '#8B5E3C', fontSize: '0.87rem' }}>{v}</span> },
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
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard'   },
  { key: 'orders',    icon: <ShoppingOutlined />,  label: 'Orders'      },
  { key: 'products',  icon: <AppstoreOutlined />,  label: 'Products'    },
  { key: 'customers', icon: <UserOutlined />,      label: 'Customers'   },
  { key: 'analytics', icon: <LineChartOutlined />, label: 'Analytics'   },
]

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeKey, setActiveKey]  = useState('dashboard')
  const navigate = useNavigate()

  const bestSellers = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 3)

  return (
    <Layout style={{ minHeight: '100vh', background: '#F5EDE3' }}>
      {/* SIDER */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={240}
        style={{
          background: '#2C1810',
          boxShadow: '4px 0 24px rgba(0,0,0,0.2)',
          position: 'fixed',
          left: 0, top: 0, bottom: 0,
          zIndex: 200,
          overflow: 'auto',
        }}
        trigger={null}
      >
        {/* Logo */}
        <div style={{ padding: collapsed ? '24px 0' : '24px 20px', borderBottom: '1px solid rgba(255,245,225,0.1)', textAlign: collapsed ? 'center' : 'left' }}>
          <div style={{ fontSize: collapsed ? 28 : 22 }}>🥐</div>
          {!collapsed && (
            <>
              <div style={{ fontFamily: 'Playfair Display, serif', color: '#FFF5E1', fontWeight: 700, fontSize: '0.95rem', marginTop: 6 }}>Prime Aroma</div>
              <div style={{ color: '#C4956A', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin Portal</div>
            </>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={e => setActiveKey(e.key)}
          items={MENU_ITEMS}
          style={{ background: 'transparent', border: 'none', marginTop: 8 }}
          theme="dark"
        />

        {/* Bottom nav */}
        <div style={{ position: 'absolute', bottom: 0, width: '100%', borderTop: '1px solid rgba(255,245,225,0.1)', padding: '16px 0' }}>
          <Menu
            mode="inline"
            items={[
              { key: 'store',  icon: <AppstoreOutlined />, label: <Link to="/" style={{ color: 'inherit' }}>View Store</Link> },
              { key: 'logout', icon: <LogoutOutlined />,   label: 'Logout' },
            ]}
            style={{ background: 'transparent', border: 'none' }}
            theme="dark"
          />
        </div>
      </Sider>

      {/* MAIN */}
      <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: 'margin 0.2s', background: '#F5EDE3' }}>

        {/* Top Header */}
        <Header style={{
          background: '#fff', padding: '0 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 2px 12px rgba(107,62,38,0.08)',
          position: 'sticky', top: 0, zIndex: 100, height: 68,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button
              type="text"
              icon={collapsed ? '▶' : '◀'}
              onClick={() => setCollapsed(c => !c)}
              style={{ color: '#6B3E26', fontWeight: 700 }}
            />
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#2C1810', fontSize: '1.1rem' }}>
                {MENU_ITEMS.find(m => m.key === activeKey)?.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#8B5E3C' }}>Prime Aroma Foods Bakery</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600, color: '#2C1810', fontSize: '0.9rem' }}>Admin User</div>
              <div style={{ color: '#8B5E3C', fontSize: '0.75rem' }}>admin@primearoma.in</div>
            </div>
            <Avatar size={40} style={{ background: '#6B3E26', fontFamily: 'Playfair Display, serif', cursor: 'pointer' }}>A</Avatar>
          </div>
        </Header>

        <Content style={{ padding: '32px 32px 48px', minHeight: 'calc(100vh - 68px)' }}>

          {/* ── Metric Cards ── */}
          <Row gutter={[20, 20]} style={{ marginBottom: 28 }}>
            {METRICS.map(m => (
              <Col key={m.title} xs={24} sm={12} xl={6}>
                <Card
                  className="hover-card"
                  style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.08)' }}
                  bodyStyle={{ padding: 24 }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: m.color }}>
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
                    title={<span style={{ color: '#8B5E3C', fontSize: '0.85rem', fontWeight: 500 }}>{m.title}</span>}
                    value={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    valueStyle={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#2C1810', fontSize: '1.7rem' }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          {/* ── Charts Row ── */}
          <Row gutter={[20, 20]} style={{ marginBottom: 28 }}>
            {/* Revenue Line Chart */}
            <Col xs={24} lg={16}>
              <Card
                title={<span style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810', fontSize: '1.05rem' }}>Revenue Overview</span>}
                extra={<Tag color="#6B3E26" style={{ borderRadius: 20 }}>Last 6 Months</Tag>}
                style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.08)' }}
                bodyStyle={{ paddingTop: 8 }}
              >
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={REVENUE_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F5E6C8" />
                    <XAxis dataKey="month" tick={{ fill: '#8B5E3C', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} tick={{ fill: '#8B5E3C', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']}
                      contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.15)' }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#6B3E26" strokeWidth={3} dot={{ fill: '#6B3E26', r: 5 }} activeDot={{ r: 7 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Orders Bar Chart */}
            <Col xs={24} lg={8}>
              <Card
                title={<span style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810', fontSize: '1.05rem' }}>Orders</span>}
                extra={<Tag color="#8B5E3C" style={{ borderRadius: 20 }}>Monthly</Tag>}
                style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.08)' }}
                bodyStyle={{ paddingTop: 8 }}
              >
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F5E6C8" />
                    <XAxis dataKey="month" tick={{ fill: '#8B5E3C', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#8B5E3C', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.15)' }}
                    />
                    <Bar dataKey="orders" fill="#C4956A" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* ── Orders Table + Best Sellers ── */}
          <Row gutter={[20, 20]}>
            <Col xs={24} xl={16}>
              <Card
                title={<span style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810', fontSize: '1.05rem' }}>Recent Orders</span>}
                extra={<Button type="text" style={{ color: '#6B3E26', fontWeight: 600 }}>View All →</Button>}
                style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.08)' }}
              >
                <Table
                  dataSource={DASHBOARD_ORDERS}
                  columns={TABLE_COLS}
                  pagination={{ pageSize: 5, size: 'small' }}
                  rowKey="key"
                  size="middle"
                  scroll={{ x: 640 }}
                  rowClassName="order-row"
                />
              </Card>
            </Col>

            {/* Best Sellers */}
            <Col xs={24} xl={8}>
              <Card
                title={<span style={{ fontFamily: 'Playfair Display, serif', color: '#2C1810', fontSize: '1.05rem' }}>🏆 Best Sellers</span>}
                style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.08)' }}
              >
                {bestSellers.map((p, i) => (
                  <div key={p.id} style={{
                    display: 'flex', gap: 14, alignItems: 'center', padding: '14px 0',
                    borderBottom: i < bestSellers.length - 1 ? '1px solid #F5E6C8' : 'none',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, overflow: 'hidden', flexShrink: 0,
                    }}>
                      <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: '#2C1810', fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name}
                      </div>
                      <div style={{ color: '#8B5E3C', fontSize: '0.78rem' }}>{p.reviews} orders</div>
                    </div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#6B3E26' }}>₹{p.price}</div>
                    <Tag style={{ borderRadius: 20, background: '#F5E6C8', border: 'none', color: '#6B3E26', fontWeight: 700, width: 24, textAlign: 'center', padding: '0 6px' }}>
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
        .ant-table-row:hover > td { background: #FFF5E1 !important; }
        .ant-menu-dark .ant-menu-item-selected { background: rgba(255,245,225,0.15) !important; }
        .ant-menu-dark .ant-menu-item:hover { background: rgba(255,245,225,0.10) !important; }
      `}</style>
    </Layout>
  )
}
