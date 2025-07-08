import { Card, List, Avatar } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';

function RecentTransactions({ data, loading }) {
    return (
        <Card
            title="Recent Transactions"
            bordered
            style={{
                borderRadius: 12,
                borderColor: '#e0e0e0',
                boxShadow: 'none',
                minWidth: 320,
            }}
            bodyStyle={{ padding: 18 }}
            loading={loading}
        >
            <div
                style={{
                    maxHeight: 520, // Adjust based on your item height; 10 items * ~50px each
                    overflowY: 'auto',
                }}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={data || []}
                    split={false}
                    locale={{ emptyText: "No transactions" }}
                    renderItem={(item, idx) => (
                        <List.Item
                            style={{
                                background: '#fafbfc',
                                borderRadius: 8,
                                marginBottom: 12,
                                border: '1px solid #f0f0f0',
                                padding: '12px 16px',
                                alignItems: 'center',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                            }}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        style={{
                                            background: '#f0f5ff',
                                            color: '#1890ff',
                                            border: '1.5px solid #d6e4ff',
                                        }}
                                        icon={<DollarCircleOutlined />}
                                    />
                                }
                                title={
                                    <span style={{ fontWeight: 600, color: '#222' }}>
                                        {item.name}
                                    </span>
                                }
                                description={
                                    <span style={{ color: '#757575', fontSize: 15 }}>
                                        #{item.id} &nbsp; &bull; &nbsp;
                                        <span style={{ color: '#1890ff', fontWeight: 500 }}>
                                            ${item.amount}
                                        </span>
                                    </span>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        </Card>
    );
}

export default RecentTransactions;
