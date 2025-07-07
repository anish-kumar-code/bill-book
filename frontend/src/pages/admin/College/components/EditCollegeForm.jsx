"use client";
import {
  Button,
  Form,
  Input,
  message,
  Upload,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom"; // If using next/router, adapt accordingly
import { useEffect, useState } from "react";
import { getCollegeDataById, UpdateCollegeDetails } from "../../../../services/admin/apiCollege";

const { TextArea } = Input;

const EditCollegeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data; // The passed data from previous page
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [directorImg, setDirectorImg] = useState(null);
  const [aboutImg, setAboutImg] = useState(null);

  useEffect(() => {
    console.log("useEffect called with data:");
    const fetchData = async () => {
        try {
            const datas = await getCollegeDataById(data.id);
            console.log("Fetched data:", datas);
            if(datas?.status) {
                form.setFieldsValue({
                    ...datas.data?.collegeDetails,
                });
            }   
        } catch (error) {
            console.log("data is not get by the id");
        }finally{
            console.log("data is get by the id of the college.")
        }
    };
    // if (data) {
    //   form.setFieldsValue({
    //     ...data,
    //   });
    // }
    //   form.setFieldsValue({
    //     ...data,
    //   });
    fetchData();
  }, [data, form]);

  const handleFileChange = (info, setter) => {
    if (info.file.status === "removed") {
      setter(null);
    } else {
      setter(info.file.originFileObj);
    }
  };

  const handleSubmit = async () => {
  try {
    const values = await form.validateFields();

    const submitData = {
      ...values,
    };
   let id = data.id;
console.log(id," this is the id for the college")
    // Attach files
    if (logoFile) submitData.collegeLogo = logoFile;
    if (directorImg) submitData.directorImage = directorImg;
    if (aboutImg) submitData.aboutImage = aboutImg;

    // ✅ Convert to FormData
    const formData = new FormData();
    for (const key in submitData) {
      formData.append(key, submitData[key]);
    }

    setLoading(true);
    const res = await UpdateCollegeDetails(formData,id);

    if (res?.status) {
      message.success("College updated successfully!");
      navigate(-1);
    } else {
      message.error(res?.message || "Failed to update college.");
    }
  } catch (error) {
    message.error("Error updating college.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Edit College</h2>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input type="email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="mobileNo" label="Mobile No" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="collegeName" label="College Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="collegeCode" label="College Code">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="address" label="Address">
              <TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="city" label="City">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="state" label="State">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="pincode" label="Pincode">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="website" label="Website">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="contactPerson" label="Contact Person">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="aboutUs" label="About Us">
              <TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="directorName" label="Director Name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="directorMessage" label="Director Message">
              <TextArea rows={2} />
            </Form.Item>
          </Col>
          {/* File Uploads */}
          <Col span={12}>
            <Form.Item label="College Logo">
              <Upload
                beforeUpload={() => false}
                onChange={(info) => handleFileChange(info, setLogoFile)}
                maxCount={1}
                showUploadList={{ showRemoveIcon: true }}
              >
                <Button icon={<UploadOutlined />}>Upload College Logo</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Director Image">
              <Upload
                beforeUpload={() => false}
                onChange={(info) => handleFileChange(info, setDirectorImg)}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload Director Image</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="About Image">
              <Upload
                beforeUpload={() => false}
                onChange={(info) => handleFileChange(info, setAboutImg)}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload About Image</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update College
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EditCollegeForm;
