// SubscriptionPlanForm.jsx
import React from 'react';
import { Form, Input, InputNumber, Button, Row, Col } from 'antd';

const buttonStyle = {
    background: '#117dc8',
    borderColor: '#117dc8',
    borderRadius: 8,
    padding: '0 32px',
    fontWeight: 600,
    fontSize: 16,
    height: 44,
};

const formStyle = {
    background: '#fff',
    padding: 32,
    borderRadius: 16,
    border: '1.5px solid #e0e0e0',
    boxShadow: '0 1px 8px rgba(0,0,0,0.03)',
    margin: 'auto',
};

const SubscriptionPlanForm = ({ form, onFinish, loading }) => {
    return (
        <Form
            form={form}
            name="subscription_plan"
            onFinish={onFinish}
            layout="vertical"
            style={formStyle}
        >
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the plan name!' }]}
                    >
                        <Input placeholder="Enter plan name" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <InputNumber
                            min={0}
                            placeholder="Enter price"
                            style={{ width: '100%' }}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="duration_days"
                        label="Duration (Days)"
                        rules={[{ required: true, message: 'Please input the duration!' }]}
                    >
                        <InputNumber min={1} placeholder="Enter duration" style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item
                        name="staffAccount"
                        label="Staff Count"
                        rules={[{ required: true, message: 'Please input staff count!' }]}
                    >
                        <InputNumber min={0} placeholder="Enter count" style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item style={{ marginTop: 24 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={buttonStyle}
                    loading={loading}
                >
                    Add Plan
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SubscriptionPlanForm;
