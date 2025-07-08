import React, { useEffect, useState, useCallback } from 'react';
import { Form, Input, InputNumber, Button, Row, Col, message, Modal } from 'antd';
import SubscriptionPlanTable from './components/SubscriptionPlanTable';
import { addSubscriptionPlan, getSubscriptionPlan, editSubscriptionPlan, deleteSubscriptionPlan } from '../../../services/admin/apiSubscriptionPlan';
import SubscriptionPlanForm from './components/SubscriptionPlanForm';
import SubscriptionPlanEditModal from './components/SubscriptionPlanEditModal';

const formStyle = {
    background: '#fff',
    padding: 32,
    borderRadius: 16,
    border: '1.5px solid #e0e0e0',
    boxShadow: '0 1px 8px rgba(0,0,0,0.03)',
    margin: 'auto',
};

const buttonStyle = {
    background: '#117dc8',
    borderColor: '#117dc8',
    borderRadius: 8,
    padding: '0 32px',
    fontWeight: 600,
    fontSize: 16,
    height: 44,
};

const SubscriptionPlan = () => {
    const [plans, setPlans] = useState([]);
    const [formLoading, setFormLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const fetchSubscriptionPlan = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getSubscriptionPlan();
            setPlans(res.data.data || []);
        } catch (error) {
            message.error('Failed to fetch plans');
            setPlans([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSubscriptionPlan();
    }, [fetchSubscriptionPlan]);

    const onFinish = async (values) => {
        setFormLoading(true);
        try {
            await addSubscriptionPlan(values);
            message.success('Subscription plan added successfully');
            form.resetFields();
            fetchSubscriptionPlan();
        } catch (error) {
            console.error('Error:', error);
            message.error('Error adding plan: ' + (error.message || 'Unknown error'));
        } finally {
            setFormLoading(false);
        }
    };

    const onUpdateStatus = async (id, isActive) => {
        try {
            await editSubscriptionPlan(id, { isActive });
            message.success('Status updated successfully');
            fetchSubscriptionPlan();
        } catch (error) {
            message.error('Error updating status: ' + (error.message || 'Unknown error'));
        }
    };

    const showEditModal = (record) => {
        setEditingRecord(record);
        editForm.setFieldsValue({
            name: record.name,
            price: record.price,
            duration_days: record.duration_days,
            adminAccount: record.adminAccount,
            staffAccount: record.staffAccount,
        });
        setIsEditModalVisible(true);
    };

    const handleEditFinish = async (values) => {
        try {
            await editSubscriptionPlan(editingRecord._id, values);
            message.success('Plan updated successfully');
            setIsEditModalVisible(false);
            fetchSubscriptionPlan();
        } catch (error) {
            message.error('Error updating plan: ' + (error.message || 'Unknown error'));
        }
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        editForm.resetFields();
    };

    const onDelete = (record) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this plan?',
            content: `Plan: ${record.name}`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await deleteSubscriptionPlan(record._id);
                    message.success('Plan deleted successfully');
                    fetchSubscriptionPlan();
                } catch (error) {
                    message.error('Error deleting plan: ' + (error.message || 'Unknown error'));
                }
            },
        });
    };

    const onEdit = (record) => {
        showEditModal(record);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold text-[#117dc8] mb-4">Add Subscription Plan</h2>

            <SubscriptionPlanForm form={form} onFinish={onFinish} loading={formLoading} />

            <SubscriptionPlanTable
                data={plans}
                loading={loading}
                onUpdateStatus={onUpdateStatus}
                onEdit={onEdit}
                onDelete={onDelete}
            />

            <SubscriptionPlanEditModal
                visible={isEditModalVisible}
                form={editForm}
                onCancel={handleEditCancel}
                onFinish={handleEditFinish}
            />
        </div>
    );
};

export default SubscriptionPlan;