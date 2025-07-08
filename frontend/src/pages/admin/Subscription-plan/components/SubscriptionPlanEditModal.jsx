import React from 'react';
import { Modal, Form, Input, InputNumber, Row, Col } from 'antd';

const SubscriptionPlanEditModal = ({
    visible,
    form,
    onCancel,
    onFinish
}) => {
    return (
        <Modal
            title="Edit Subscription Plan"
            open={visible}
            onOk={() => form.submit()}
            onCancel={onCancel}
            okText="Save"
            cancelText="Cancel"
            style={{ top: 20 }}
        >
            <Form
                form={form}
                name="edit_subscription_plan"
                onFinish={onFinish}
                layout="vertical"
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input the plan name!' }]}
                        >
                            <Input placeholder="Enter plan name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                    <Col span={12}>
                        <Form.Item
                            name="duration_days"
                            label="Duration (Days)"
                            rules={[{ required: true, message: 'Please input the duration!' }]}
                        >
                            <InputNumber min={1} placeholder="Enter duration" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="staffAccount"
                            label="Staff Count"
                            rules={[{ required: true, message: 'Please input staff count!' }]}
                        >
                            <InputNumber min={0} placeholder="Enter count" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default SubscriptionPlanEditModal;
