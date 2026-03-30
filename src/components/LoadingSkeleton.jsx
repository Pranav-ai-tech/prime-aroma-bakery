import { Row, Col, Card, Skeleton } from 'antd'

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <Row gutter={[24, 24]}>
      {Array.from({ length: count }).map((_, i) => (
        <Col key={i} xs={24} sm={12} md={8} lg={6}>
          <Card bodyStyle={{ padding: 0 }} style={{ borderRadius: 14, overflow: 'hidden', border: 'none', boxShadow: '0 4px 20px rgba(107,62,38,0.08)' }}>
            <Skeleton.Image active style={{ width: '100%', height: 200, borderRadius: 0 }} />
            <div style={{ padding: 16 }}>
              <Skeleton active paragraph={{ rows: 2 }} title={{ width: '70%' }} />
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
