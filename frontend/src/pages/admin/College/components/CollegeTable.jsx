import { Avatar, Button, Modal, Table, Tag } from 'antd';
import { FaEdit, FaUser } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const BASE_URL = import.meta.env.VITE_BASE_URL || ''; // For demo

const CollegeTable = ({searchText="", data }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCollege, setSelectedCollege] = useState(null);
 const navigate = useNavigate();

    const tableData = data.map((college) => ({
        id: college._id,
        name: college.name || '',
        collegeName: college.collegeName || '',
        collegeLogo: college.collegeLogo ? `${BASE_URL}${college.collegeLogo}` : '',
        collegeId: college.collegeId || '',
        collegePassword: college.password || '',
        aboutus: college.aboutUs || '',
        aboutusImage: college.aboutUsImage ? `${BASE_URL}${college.aboutUsImage}` : '',
        directorName: college.directorName || '',
        directorImage: college.directorImage ? `${BASE_URL}${college.directorImage}` : '',
        mobileNo: college.mobileNo || '',
        email: college.email || '',
        status: college.status,
        state: college.state || '',
        city: college.city || '',
        pincode: college.pincode || '',
        address: college.address || '',
        snNo: data.indexOf(college) + 1 // Adding serial number
    }));
    const handleViewDetails = (record) => {
        setSelectedCollege(record);
        setIsModalVisible(true);
    };
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedCollege(null);
    };
     const handleEdit = (record) => {
      console.log("Selected Record for Edit:", record);
    // Store the record in context for the edit page
    setSelectedCollege(record);
    // Navigate to the edit page using collegeId
    navigate(`${record.id}`, { state: { data: record } });
  };
    const columns = [
        {
            title: 'Sn. No',
            dataIndex: 'snNo',
            key: 'snNo',
            align: 'center'
        },
        {
            title: 'Logo',
            key: 'collegeLogo',
            align: 'center',
            render: (_, record) => (
                <Avatar size={40} src={record.collegeLogo} icon={<FaUser />} />
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
            title: 'Profile Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => (
                <Tag color={status ==="profileCompleted" ? 'green' : 'red'}>
                    {status == 'profileCompleted' ? 'Completed' : 'Pending'}
                </Tag>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
               <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Button
            type="primary"
            icon={<IoMdEye />}
            onClick={() => handleViewDetails(record)}
            style={{ display: 'flex', alignItems: 'center' }}
          />
          <Button
            type="default"
            icon={<FaEdit />}
            onClick={() => handleEdit(record)}
            style={{ display: 'flex', alignItems: 'center' }}
          />
        </div>
            )
        }
    ];
    return (
        <>
            <Table
                dataSource={tableData.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )}
                columns={columns}
                rowKey="id"
                scroll={{ x: true }}
                bordered={false}
                size="small"
            />

             <Modal
      visible={isModalVisible}
      title={<h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a' }}>College Details</h2>}
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
      {selectedCollege && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            lineHeight: '1.8',
            fontFamily: "'Inter', sans-serif",
            color: '#333',
          }}
        >
          {/* College Header Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent:"center",
              gap: '16px',
              padding: '16px',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <img
              src={selectedCollege.collegeLogo}
              alt="College Logo"
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
              }}
            />
            <div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  margin: '0',
                  color: '#1a1a1a',
                }}
              >
                {selectedCollege.collegeName}
              </h3>
              <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
                {selectedCollege.city}, {selectedCollege.state}
              </p>
            </div>
          </div>

          {/* College Details Section */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              padding: '16px',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>
                <strong style={{ color: '#1a1a1a' }}>College ID:</strong> {selectedCollege.collegeId}
              </p>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>
                <strong style={{ color: '#1a1a1a' }}>Password:</strong> {selectedCollege.collegePassword}
              </p>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>
                <strong style={{ color: '#1a1a1a' }}>Email:</strong> {selectedCollege.email}
              </p>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>
                <strong style={{ color: '#1a1a1a' }}>Mobile:</strong> {selectedCollege.mobileNo}
              </p>
            </div>
            <div>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>
                <strong style={{ color: '#1a1a1a' }}>Address:</strong> {selectedCollege.address}
              </p>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>
                <strong style={{ color: '#1a1a1a' }}>City:</strong> {selectedCollege.city}
              </p>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>
                <strong style={{ color: '#1a1a1a' }}>State:</strong> {selectedCollege.state}
              </p>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>
                <strong style={{ color: '#1a1a1a' }}>Pincode:</strong> {selectedCollege.pincode}
              </p>
            </div>
          </div>

          {/* About Us Section */}
          <div
            style={{
              padding: '16px',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <h4 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 12px', color: '#1a1a1a' }}>
              About Us
            </h4>
            <p style={{ fontSize: '14px', color: '#444', margin: '0 0 16px' }}>
              {selectedCollege.aboutus}
            </p>
            <img
              src={selectedCollege.aboutusImage}
              alt="About us"
              style={{
                width: '100%',
                maxHeight: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
              }}
            />
          </div>

          {/* Director Info Section */}
          <div
            style={{
              padding: '16px',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <h4 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 12px', color: '#1a1a1a' }}>
              Director Info
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={selectedCollege.directorImage}
                alt="Director"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid #e5e7eb',
                }}
              />
              <p style={{ fontSize: '14px', color: '#444' }}>
                <strong style={{ color: '#1a1a1a' }}>Director Name:</strong> {selectedCollege.directorName}
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
        </>
    );
};

export default CollegeTable;