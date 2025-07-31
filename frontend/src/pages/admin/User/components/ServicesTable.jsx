import { Avatar, Button, Modal, Table, Switch, message, Tooltip, Tabs } from 'antd';
import { FaUser } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { SlDocs } from "react-icons/sl";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getService, getServiceCount } from '../../../../services/admin/apiService';
import { updateUser } from '../../../../services/admin/apiUser';
import { columnsConfig } from './getCommonColumns';

const StyledSection = ({ title, children, style = {} }) => (
    <div style={{
        padding: '16px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        marginBottom: '16px',
        ...style
    }}>
        {title && <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{title}</h4>}
        {children}
    </div>
);

const InfoItem = ({ label, value }) => (
    <p style={{ margin: '8px 0' }}>
        <strong>{label}:</strong> {value || 'N/A'}
    </p>
);

const ServicesTable = ({ searchText = "" }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [activeTab, setActiveTab] = useState('quotation');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [serviceCounts, setServiceCounts] = useState({});
    const navigate = useNavigate();
    const { userId } = useParams();

    const services = [
        { key: 'quotation', label: `Quotation (${serviceCounts.quotation || 0})` },
        { key: 'survey_list', label: `Survey List (${serviceCounts.survey || 0})` },
        { key: 'packing_list', label: `Packing List (${serviceCounts.packing_list || 0})` },
        { key: 'lr_bilty', label: `LR-Bilty (${serviceCounts.lr_bilty || 0})` },
        { key: 'proforma_invoice', label: `Proforma Invoice (${serviceCounts.proforma_invoice || 0})` },
        { key: 'bill', label: `Bill (${serviceCounts.bill || 0})` },
        { key: 'money_receipt', label: `Money Receipt (${serviceCounts.money_receipt || 0})` },
        { key: 'car_condition', label: `Car Condition (${serviceCounts.car_condition || 0})` },
        { key: 'payment_voucher', label: `Payment Voucher (${serviceCounts.payment_voucher || 0})` },
        { key: 'tws_form', label: `TWS Form (${serviceCounts.tws_form || 0})` },
        { key: 'fov_scf_form', label: `FOV-SCF Form (${serviceCounts.fov_scf_form || 0})` },
        { key: 'noc_letter', label: `NOC Letter (${serviceCounts.noc_letter || 0})` },
    ];

    const normalizeData = (rawData, serviceKey) => {
        return rawData.map((item) => {
            let name = '';
            if (serviceKey === 'bill' || serviceKey === 'proforma_invoice') {
                name = item.formData?.billingDetails?.customerName || item.formData?.consignorDetails?.consignorName || 'N/A';
            } else if (serviceKey === 'lr_bilty') {
                name = item.formData?.moveFrom?.consignorName || item.formData?.moveTo?.consigneeName || 'N/A';
            } else if (serviceKey === 'money_receipt' || serviceKey === 'packing_list' || serviceKey === 'payment_voucher' || serviceKey === 'tws_form' || serviceKey === 'survey_list') {
                name = item.formData?.name || item.formData?.customerDetails?.name || item.formData?.receiverName || 'N/A';
            } else if (serviceKey === 'quotation') {
                name = item.formData?.quotationDetails?.companyName || 'N/A';
            } else if (serviceKey === 'car_condition') {
                name = item.formData?.vehicleDetails?.partyName || 'N/A';
            } else if (serviceKey === 'fov_scf_form') {
                name = item.formData?.fovScf?.name || 'N/A';
            } else if (serviceKey === 'noc_letter') {
                name = item.formData?.nocForm?.name || 'N/A';
            }
            return { ...item, name };
        });
    };

    const fetchData = async (serviceKey) => {
        setLoading(true);
        try {
            const response = await getService(serviceKey, userId);
            const normalizedData = normalizeData(response.data.data || [], serviceKey);
            setData(normalizedData);
        } catch (error) {
            message.error(`Failed to fetch data for ${serviceKey.replace('_', ' ')}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchServiceCounts = async () => {
        try {
            const response = await getServiceCount(null, userId);
            setServiceCounts(response.data.data || {});
        } catch (error) {
            message.error('Failed to fetch service counts');
        }
    };

    useEffect(() => {
        fetchServiceCounts();
    }, [userId]);

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);

    const handleViewDetails = (record) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedRecord(null);
    };

    const handleStatusChange = async (checked, record) => {
        try {
            const status = checked ? 'active' : 'inactive';
            await updateUser(record._id, { status });
            message.success(`Status changed to ${checked ? 'Active' : 'Inactive'} for ${record.name}`);
            fetchData(activeTab);
            fetchServiceCounts(); // Refresh counts after status change
        } catch (error) {
            message.error('Failed to update status');
        }
    };

    const columns = columnsConfig[activeTab](handleStatusChange, handleViewDetails);

    const dataWithSerialNumbers = data.map((item, index) => ({
        ...item,
        snNo: index + 1,
        key: item._id || index,
    }));

    const filteredData = dataWithSerialNumbers.filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(searchText.toLowerCase());
        return nameMatch;
    });

    return (
        <>
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={services}
                style={{ marginBottom: '16px' }}
            />
            <Table
                dataSource={filteredData}
                columns={columns}
                loading={loading}
                scroll={{ x: true }}
                bordered={false}
                size="small"
            />
        </>
    );
};

export default ServicesTable;