import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Upload,
    Button,
    message,
    Spin,
    Row,
    Col
} from 'antd';
import {
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import {
    getAllSettings,
    updateAdminCardImage,
    updateFavicon,
    updateLogo,
    updateSettings
} from '../../../../services/apiSettings';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Charges() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);

    // File lists for Upload components
    const [logoFileList, setLogoFileList] = useState([]);
    const [faviconFileList, setFaviconFileList] = useState([]);
    const [adminCardImageFileList, setAdminCardImageFileList] = useState([]);

    useEffect(() => {
        fetchSetting();
        // eslint-disable-next-line
    }, []);

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG files!');
            return Upload.LIST_IGNORE;
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Image must be smaller than 10MB!');
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    const fetchSetting = async () => {
        try {
            setLoading(true);
            const data = await getAllSettings();
            form.setFieldsValue({
                brandName: data.appName,
                email: data.supportEmail,
                mobile: data.supportContact,
                address: data.adminCard?.description,
                googleMapApiKey: data.thirdPartyKeys?.googleMapApiKey,
                razorpayKeyId: data.paymentKeys?.keyId,
                razorpayKeySecret: data.paymentKeys?.keySecret,
                websiteUrl: data.websiteUrl
            });

            // Set file lists for previews
            setLogoFileList(
                data.logo
                    ? [
                        {
                            uid: '-1',
                            name: 'logo.png',
                            status: 'done',
                            url: `${BASE_URL}/${data.logo}`
                        }
                    ]
                    : []
            );
            setFaviconFileList(
                data.favicon
                    ? [
                        {
                            uid: '-1',
                            name: 'favicon.png',
                            status: 'done',
                            url: `${BASE_URL}/${data.favicon}`
                        }
                    ]
                    : []
            );
            setAdminCardImageFileList(
                data.adminCard?.image
                    ? [
                        {
                            uid: '-1',
                            name: 'adminCardImage.png',
                            status: 'done',
                            url: `${BASE_URL}/${data.adminCard.image}`
                        }
                    ]
                    : []
            );
        } catch (error) {
            message.error('Failed to load settings.');
        } finally {
            setLoading(false);
        }
    };

    const handleUploadChange = (setter) => ({ fileList }) => {
        setter(fileList);
    };

    const onFinish = async (values) => {
        setUpdateLoading(true);
        try {
            const settingForm = new FormData();
            settingForm.append('appName', values.brandName);
            settingForm.append('websiteUrl', values.websiteUrl);
            settingForm.append('supportEmail', values.email);
            settingForm.append('supportContact', values.mobile);
            settingForm.append('adminCard[title]', values.brandName);
            settingForm.append('adminCard[description]', values.address);
            settingForm.append('thirdPartyKeys[googleMapApiKey]', values.googleMapApiKey);
            settingForm.append('paymentKeys[keyId]', values.razorpayKeyId);
            settingForm.append('paymentKeys[keySecret]', values.razorpayKeySecret);

            await updateSettings(settingForm);

            // Logo upload
            if (logoFileList.length && logoFileList[0].originFileObj) {
                const logoForm = new FormData();
                logoForm.append('logo', logoFileList[0].originFileObj);
                await updateLogo(logoForm);
            }

            // Favicon upload
            if (faviconFileList.length && faviconFileList[0].originFileObj) {
                const faviconForm = new FormData();
                faviconForm.append('favicon', faviconFileList[0].originFileObj);
                await updateFavicon(faviconForm);
            }

            // Admin Card Image upload
            if (adminCardImageFileList.length && adminCardImageFileList[0].originFileObj) {
                const cardForm = new FormData();
                cardForm.append('image', adminCardImageFileList[0].originFileObj);
                await updateAdminCardImage(cardForm);
            }

            message.success('Settings updated successfully!');
            fetchSetting();
        } catch (err) {
            message.error('Failed to update settings.');
        } finally {
            setUpdateLoading(false);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    if (loading)
        return (
            <Spin size="large" fullscreen />
        );

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Settings</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="max-w-2xl"
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Site Name"
                            name="brandName"
                            rules={[{ required: true }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Site Logo" name="logo" >
                            <Upload
                                name="logo"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={true}
                                beforeUpload={beforeUpload}
                                fileList={logoFileList}
                                onChange={handleUploadChange(setLogoFileList)}
                                maxCount={1}
                                accept=".jpg,.jpeg,.png"
                            >
                                {logoFileList.length >= 1 ? null : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Website URL"
                            name="websiteUrl"
                            rules={[{ required: true }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Support Email"
                            name="email"
                            rules={[{ required: true }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Mobile No"
                            name="mobile"
                            rules={[{ required: true }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="About or Description"
                            name="address"
                            rules={[{ required: true }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* <Form.Item
                    label="Google Map API Key"
                    name="googleMapApiKey"
                    rules={[{ required: true }]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    label="Razorpay Key ID"
                    name="razorpayKeyId"
                    rules={[{ required: true }]}
                >
                    <Input size="large" disabled />
                </Form.Item>
                <Form.Item
                    label="Razorpay Key Secret"
                    name="razorpayKeySecret"
                    rules={[{ required: true }]}
                >
                    <Input size="large" disabled />
                </Form.Item> */}

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Favicon" name="favicon" >
                            <Upload
                                name="favicon"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={true}
                                beforeUpload={beforeUpload}
                                fileList={faviconFileList}
                                onChange={handleUploadChange(setFaviconFileList)}
                                maxCount={1}
                                accept=".jpg,.jpeg,.png"
                            >
                                {faviconFileList.length >= 1 ? null : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Admin Card Image" >
                            <Upload
                                name="adminCardImage"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={true}
                                beforeUpload={beforeUpload}
                                fileList={adminCardImageFileList}
                                onChange={handleUploadChange(setAdminCardImageFileList)}
                                maxCount={1}
                                accept=".jpg,.jpeg,.png"
                            >
                                {adminCardImageFileList.length >= 1 ? null : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                {/* <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={updateLoading}
                    >
                        Save Changes
                    </Button>
                </Form.Item> */}
            </Form>
        </div>
    );
}

export default Charges;
