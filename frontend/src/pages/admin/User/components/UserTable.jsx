import { Avatar, Button, Modal, Table, Switch, message } from 'antd';
import { FaUser } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { updateUser } from '../../../../services/admin/apiUser';

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

const UserTable = ({ searchText = "", data = [], loading, refreshData }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const navigate = useNavigate();

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
            refreshData && refreshData();
        } catch (error) {
            message.error('Failed to update status');
        }
    };

    const columns = [
        {
            title: 'Sn. No',
            dataIndex: 'snNo',
            key: 'snNo',
            align: 'center'
        },
        {
            title: 'Profile',
            key: 'profile',
            align: 'center',
            render: (_, record) => (
                <Avatar size={40} src={record?.profileImage || record?.collegeLogo} icon={<FaUser />} />
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center'
        },
        {
            title: 'Mobile No',
            dataIndex: 'mobileNo',
            key: 'mobileNo',
            align: 'center'
        },
        {
            title: 'Status',
            key: 'status',
            align: 'center',
            render: (_, record) => (
                <Switch
                    checked={record.status === 'active'}
                    onChange={(checked) => handleStatusChange(checked, record)}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                />
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Button
                    type="primary"
                    icon={<IoMdEye />}
                    onClick={() => handleViewDetails(record)}
                    style={{ display: 'flex', alignItems: 'center' }}
                />
            )
        }
    ];

    const dataWithSerialNumbers = data.map((item, index) => ({
        ...item,
        snNo: index + 1,
        key: item._id || index
    }));

    const filteredData = dataWithSerialNumbers.filter((item) => {
        const mobileMatch = item.mobileNo?.toLowerCase().includes(searchText.toLowerCase());
        const nameMatch = item.name?.toLowerCase().includes(searchText.toLowerCase());
        return mobileMatch || nameMatch;
    });


    return (
        <>
            <Table
                dataSource={filteredData}
                columns={columns}
                loading={loading}
                scroll={{ x: true }}
                bordered={false}
                size="small"
            />
            <Modal
                visible={isModalVisible}
                title={<h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a' }}>User Details</h2>}
                footer={null}
                onCancel={handleCloseModal}
                width={800}
                style={{ top: '20px' }}
                bodyStyle={{
                    padding: '24px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                }}
            >
                {selectedRecord && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <StyledSection style={{ display: 'flex', alignItems: 'center', justifyContent: "center", gap: '16px' }}>
                            {selectedRecord.profileImage && (
                                <img
                                    src={`${import.meta.env.VITE_BASE_URL}/${selectedRecord?.profileImage?.replace(/\\/g, '/')}`}
                                    alt="Profile"
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                        border: '1px solid #e5e7eb',
                                    }}
                                />
                            )}
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>{selectedRecord.name}</h3>
                                <p style={{ margin: 0, color: '#666' }}>{selectedRecord.email}</p>
                                <p style={{ margin: 0, color: '#666' }}>{selectedRecord.mobileNo}</p>
                            </div>
                        </StyledSection>

                        <StyledSection title="Personal Info">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <InfoItem label="Email" value={selectedRecord.email} />
                                    <InfoItem label="Mobile" value={selectedRecord.mobileNo} />
                                    <InfoItem label="Company" value={selectedRecord.company} />
                                    <InfoItem label="Referral Code" value={selectedRecord.referralCode} />
                                </div>
                                <div>
                                    <InfoItem label="Status" value={selectedRecord.status} />
                                    <InfoItem label="Verified" value={selectedRecord.isVerified ? 'Yes' : 'No'} />
                                    <InfoItem label="New User" value={selectedRecord.isNewUser ? 'Yes' : 'No'} />
                                    <InfoItem label="Subscribed" value={selectedRecord.subscribed ? 'Yes' : 'No'} />
                                </div>
                            </div>
                        </StyledSection>

                        <StyledSection title="Address Info">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <InfoItem label="Address" value={selectedRecord.address} />
                                <InfoItem label="City" value={selectedRecord.city} />
                                <InfoItem label="State" value={selectedRecord.state} />
                                <InfoItem label="Pincode" value={selectedRecord.pincode} />
                            </div>
                        </StyledSection>

                        <StyledSection title="System Info">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <InfoItem label="Last Login" value={new Date(selectedRecord.lastLogin).toLocaleString()} />
                                <InfoItem label="Created At" value={new Date(selectedRecord.createdAt).toLocaleString()} />
                                <InfoItem label="User ID" value={selectedRecord._id} />
                            </div>
                        </StyledSection>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default UserTable;
