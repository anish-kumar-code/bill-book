import { Switch, Button, Tooltip } from 'antd';
import { IoMdEye } from 'react-icons/io';
import { SlDocs } from 'react-icons/sl';

const getCommonColumns = (handleStatusChange, handleViewDetails) => [
    {
        title: 'Sn. No',
        dataIndex: 'snNo',
        key: 'snNo',
        align: 'center',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
    },
    // {
    //     title: 'Status',
    //     key: 'status',
    //     align: 'center',
    //     render: (_, record) => (
    //         <Switch
    //             checked={record.status === 'active'}
    //             onChange={(checked) => handleStatusChange(checked, record)}
    //             checkedChildren="Active"
    //             unCheckedChildren="Inactive"
    //         />
    //     ),
    // },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        render: (date) => (date ? new Date(date).toLocaleDateString() : 'N/A'),
    },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     align: 'center',
    //     render: (_, record) => (
    //         <div className="flex gap-2">
    //             <Tooltip title="Details">
    //                 <Button type="primary" icon={<IoMdEye />} onClick={() => handleViewDetails(record)} style={{ display: 'flex', alignItems: 'center' }} />
    //             </Tooltip>
    //         </div>
    //     ),
    // },
];

export const columnsConfig = {
    quotation: (handleStatusChange, handleViewDetails) => [
        ...getCommonColumns(handleStatusChange, handleViewDetails).slice(0, -1), // Exclude Action column temporarily
        {
            title: 'Quotation Number',
            dataIndex: ['formData', 'quotationDetails', 'quotationNumber'],
            key: 'quotationNumber',
            align: 'center',
        },
        getCommonColumns(handleStatusChange, handleViewDetails).slice(-1)[0], // Add Action column back
    ],
    survey_list: (handleStatusChange, handleViewDetails) => [
        ...getCommonColumns(handleStatusChange, handleViewDetails).slice(0, -1),
        {
            title: 'Survey Number',
            dataIndex: ['formData', 'customerDetails', 'assessmentSurvey'],
            key: 'assessmentSurvey',
            align: 'center',
        },
        getCommonColumns(handleStatusChange, handleViewDetails).slice(-1)[0],
    ],
    packing_list: (handleStatusChange, handleViewDetails) => [
        ...getCommonColumns(handleStatusChange, handleViewDetails).slice(0, -1),
        {
            title: 'Packing Number',
            dataIndex: ['formData', 'customerDetails', 'packingNumber'],
            key: 'packingNumber',
            align: 'center',
        },
        getCommonColumns(handleStatusChange, handleViewDetails).slice(-1)[0],
    ],
    lr_bilty: (handleStatusChange, handleViewDetails) => [
        ...getCommonColumns(handleStatusChange, handleViewDetails).slice(0, -1),
        {
            title: 'LR Number',
            dataIndex: ['formData', 'lrDetails', 'lrNumber'],
            key: 'lrNumber',
            align: 'center',
        },
        getCommonColumns(handleStatusChange, handleViewDetails).slice(-1)[0],
    ],
    proforma_invoice: (handleStatusChange, handleViewDetails) => [
        ...getCommonColumns(handleStatusChange, handleViewDetails).slice(0, -1),
        {
            title: 'Invoice Number',
            dataIndex: ['formData', 'preInvoiceDetails', 'preInvoiceNumber'],
            key: 'preInvoiceNumber',
            align: 'center',
        },
        getCommonColumns(handleStatusChange, handleViewDetails).slice(-1)[0],
    ],
    bill: (handleStatusChange, handleViewDetails) => [
        ...getCommonColumns(handleStatusChange, handleViewDetails).slice(0, -1),
        {
            title: 'Invoice Number',
            dataIndex: ['formData', 'invoiceDetails', 'invoiceNumber'],
            key: 'invoiceNumber',
            align: 'center',
        },
        getCommonColumns(handleStatusChange, handleViewDetails).slice(-1)[0],
    ],
    money_receipt: (handleStatusChange, handleViewDetails) => [
        ...getCommonColumns(handleStatusChange, handleViewDetails).slice(0, -1),
        {
            title: 'Receipt Number',
            dataIndex: ['formData', 'receiptNumber'],
            key: 'receiptNumber',
            align: 'center',
        },
        getCommonColumns(handleStatusChange, handleViewDetails).slice(-1)[0],
    ],
    car_condition: (handleStatusChange, handleViewDetails) => [
        ...getCommonColumns(handleStatusChange, handleViewDetails).slice(0, -1),
        {
            title: 'Vehicle Number',
            dataIndex: ['formData', 'vehicleConditionDetails', 'vehicleRegistrationNumber'],
            key: 'vehicleRegistrationNumber',
            align: 'center',
        },
        getCommonColumns(handleStatusChange, handleViewDetails).slice(-1)[0],
    ],
    payment_voucher: (handleStatusChange, handleViewDetails) => [
        ...getCommonColumns(handleStatusChange, handleViewDetails).slice(0, -1),
        {
            title: 'Voucher Number',
            dataIndex: ['formData', 'voucherNumber'],
            key: 'voucherNumber',
            align: 'center',
        },
        getCommonColumns(handleStatusChange, handleViewDetails).slice(-1)[0],
    ],
    tws_form: (handleStatusChange, handleViewDetails) => [
        ...getCommonColumns(handleStatusChange, handleViewDetails).slice(0, -1),
        {
            title: 'LR Number',
            dataIndex: ['formData', 'lrNumber'],
            key: 'lrNumber',
            align: 'center',
        },
        getCommonColumns(handleStatusChange, handleViewDetails).slice(-1)[0],
    ],
    fov_scf_form: (handleStatusChange, handleViewDetails) => [
        ...getCommonColumns(handleStatusChange, handleViewDetails).slice(0, -1),
        {
            title: 'LR Number',
            dataIndex: ['formData', 'fovScf', 'lrNumber'],
            key: 'lrNumber',
            align: 'center',
        },
        getCommonColumns(handleStatusChange, handleViewDetails).slice(-1)[0],
    ],
    noc_letter: (handleStatusChange, handleViewDetails) => [
        ...getCommonColumns(handleStatusChange, handleViewDetails).slice(0, -1),
        {
            title: 'LR Number',
            dataIndex: ['formData', 'nocForm', 'lrNumber'],
            key: 'lrNumber',
            align: 'center',
        },
        getCommonColumns(handleStatusChange, handleViewDetails).slice(-1)[0],
    ],
};