import { Button, Form, Input, message, Modal, Space, Table } from "antd";
import { IoMdEye } from "react-icons/io";
import { useState } from "react";
import { createCollegeId } from "../../../../services/admin/apiEnquiry";

// Dummy data (commented out)
// const dummyEnquiries = [
//     {
//         id: 1,
//         name: 'Amit Sharma',
//         collegeName: 'Bright Future Institute',
//         category: 'Engineering',
//         email: 'amit.sharma@example.com',
//         mobileNo: '9876543210'
//     },
//     {
//         id: 2,
//         name: 'Sneha Verma',
//         collegeName: 'Sunshine College',
//         category: 'Management',
//         email: 'sneha.verma@example.com',
//         mobileNo: '9123456789'
//     }
// ];

const EnquiryTable = ({ searchText = "", loading = false, user = [] ,reloadFunc}) => {
  console.log(user, " these are the enquiry listiing");
  // State for modal visibility and selected record
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);
//   const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Map API data to table format
  const enquiries = user.map((item) => ({
    id: item._id,
    name: item.name,
    collegeName: item.collegeName,
    category: item.category,
    email: item.email,
    mobileNo: item.mobileNo,status: item.status || "inactive", // Default to 'inactive' if status is not provided
    snNo: user.indexOf(item) + 1 // Adding serial number
  }));
  const handleViewDetails = (record) => {
      setSelectedEnquiryId(record.id); 
    console.log("Selected Record:", record);
    setSelectedRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: record.name,
      collegeName: record.collegeName,
      category: record.category,
      email: record.email,
      mobileNo: record.mobileNo,
      collegeId: "",
      collegePassword: "",
      enqId: record.id, // Assuming you want to use the record ID as enqId
    });
  };
  const handleModalOk = () => {
    form.validateFields().then((values) => {
      updateCollegeId(values,selectedEnquiryId)
      setIsModalVisible(false);
      // reloadFunc(); // Refresh the table data
      form.resetFields();
    });
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const columns = [
       {
            title: 'Sn. No',
            dataIndex: 'snNo',
            key: 'snNo',
            align: 'center'
        },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "College Name",
      dataIndex: "collegeName",
      key: "collegeName",
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Mobile no",
      dataIndex: "mobileNo",
      key: "mobileNo",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        console.log(record, "record"),
        <Space>
          {record.status === "active" ? (
            <Button
              type="primary"
              icon={<IoMdEye />}
              onClick={() => handleViewDetails(record)}
            />
          ) : "Created"}
        </Space>
      ),
    },
  ];
   const updateCollegeId = async (values,selectedEnquiryId) => {
          try {
              const res = await createCollegeId({...values, enqId: selectedEnquiryId});
              if(res?.status) {
                  message.success("College ID created successfully!");
                  // Optionally, you can refresh the table data here
                  reloadFunc(); // Refresh the table data
              }
          } catch (error) {
              message.error("Failed to load user.");
          } finally {
                // message.success("College ID created successfully!");
          }
      };

  return (
    <>
      <Table
        dataSource={enquiries.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        columns={columns}
        rowKey="id"
        scroll={{ x: true }}
        loading={loading}
        bordered={false}
        size="small"
      />

      <Modal
        title="Enquiry Details"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Submit"
        //   okText="Create College"         // <- Change OK button text
        cancelText="Cancel" // <- Add this to change Cancel button text
        width={600}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Name" name="name">
            <Input disabled />
          </Form.Item>
          <Form.Item label="College Name" name="collegeName">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Mobile No" name="mobileNo">
            <Input disabled />
          </Form.Item>

          {/* Create College Button (UI only) */}
          <div style={{ margin: "12px 0" }}>
            <button
              type="button"
              className="group hover:bg-sky-600 relative bg-sky-700 rounded text-neutral-50 duration-500 font-bold flex justify-start gap-2 items-center p-2 pr-6"
            >
              <span className="border-l-2 px-1">Create College</span>
            </button>
          </div>
          <Form.Item
            label="College ID"
            name="collegeId"
            rules={[{ required: true, message: "Please enter College ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="College Password"
            name="collegePassword"
            rules={[
              { required: true, message: "Please enter College Password" },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EnquiryTable;
