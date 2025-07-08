import React from 'react';
import { Table, Switch, Space, Button } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SubscriptionPlanTable = ({ data, loading, onUpdateStatus, onEdit, onDelete }) => {
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Duration (Days)', dataIndex: 'duration_days', key: 'duration_days' },
        { title: 'Price', dataIndex: 'price', key: 'price', render: (price) => `$${price.toFixed(2)}` },
        // { title: 'Admin Count', dataIndex: 'adminAccount', key: 'adminAccount' },
        { title: 'Staff Count', dataIndex: 'staffAccount', key: 'staffAccount' },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            align: "center",
            render: (_, record) => (
                <Switch
                    checked={record.isActive}
                    onChange={(checked) => onUpdateStatus(record._id, checked)}
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            align: "right",
            render: (_, record) => (
                <Space size="small">
                    <Button type="primary" icon={<FaEdit />} onClick={() => onEdit(record)} />
                    <Button type="primary" danger icon={<FaTrash />} onClick={() => onDelete(record)} />
                </Space>
            ),
        },
    ];

    return (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#117dc8] mb-4">Subscription Plans</h2>
            <Table columns={columns} dataSource={data} rowKey="_id" loading={loading} />
        </div>
    );
};

export default SubscriptionPlanTable;