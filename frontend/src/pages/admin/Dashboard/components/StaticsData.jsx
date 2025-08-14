import React from 'react';
import { Spin, Statistic } from 'antd';
import CountUp from 'react-countup';
import { motion } from 'motion/react';
import { RiFileListLine, RiSurveyLine, RiArchiveLine, RiFileTextLine, RiBillLine, RiMoneyDollarCircleLine, RiCarLine, RiCouponLine, RiReceiptLine, RiFileWarningLine, RiFilePaperLine, RiListCheck2 } from "react-icons/ri";

function StaticsData({ data, loading }) {
    const formatter = value => <CountUp end={value} separator="," />;

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const staticData = [
        { name: "Quotation", icon: <RiFileListLine />, count: data.quotationCount, color: "#10b981" },
        { name: "Survey", icon: <RiSurveyLine />, count: data.surveyCount, color: "#3b82f6" },
        { name: "Packing", icon: <RiArchiveLine />, count: data.packingCount, color: "#f59e0b" },
        { name: "LR", icon: <RiFileTextLine />, count: data.lrCount, color: "#ef4444" },
        { name: "Bill", icon: <RiBillLine />, count: data.billCount, color: "#8b5cf6" },
        { name: "Money", icon: <RiMoneyDollarCircleLine />, count: data.moneyCount, color: "#ec4899" },
        { name: "Car", icon: <RiCarLine />, count: data.carCount, color: "#6b7280" },
        { name: "Payment", icon: <RiMoneyDollarCircleLine />, count: data.paymentCount, color: "#14b8a6" },
        { name: "Voucher", icon: <RiCouponLine />, count: data.voucherCount, color: "#d946ef" },
        { name: "Form", icon: <RiFileTextLine />, count: data.formCount, color: "#f97316" },
        { name: "Receipt", icon: <RiReceiptLine />, count: data.receiptCount, color: "#22d3ee" },
        { name: "Condition", icon: <RiFileWarningLine />, count: data.conditionCount, color: "#84cc16" },
        { name: "Invoice", icon: <RiFilePaperLine />, count: data.invoiceCount, color: "#a855f7" },
        { name: "Proforma", icon: <RiFileListLine />, count: data.proformaCount, color: "#f43f5e" },
        { name: "List", icon: <RiListCheck2 />, count: data.listCount, color: "#eab308" },
    ];

    if (loading) return <Spin size='large' />

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {staticData.map((data, index) => (
                <motion.div
                    key={data.name}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    className="relative group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <div
                        className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                        style={{ backgroundColor: data.color }}
                    />

                    <div className="p-6 flex flex-col items-center">
                        <div
                            className="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-2xl"
                            style={{
                                backgroundColor: `${data.color}20`,
                                color: data.color
                            }}
                        >
                            {data.icon}
                        </div>

                        <Statistic
                            title={<span className="text-gray-600 dark:text-gray-300">{data.name}</span>}
                            value={data.count || 0}
                            formatter={formatter}
                            valueStyle={{
                                fontSize: '1.75rem',
                                fontWeight: 700,
                                color: data.color
                            }}
                            className="text-center"
                        />

                        <div
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transition-all duration-500"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${data.color}00, ${data.color}, ${data.color}00)`,
                                opacity: 0.3
                            }}
                        />
                    </div>
                </motion.div>
            ))}

            {/* Animated Background Card */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {staticData.map((data) => (
                    <div
                        key={data.name}
                        className="absolute w-48 h-48 rounded-full blur-3xl opacity-10 -z-1"
                        style={{
                            backgroundColor: data.color,
                            top: `${Math.random() * 80}%`,
                            left: `${Math.random() * 80}%`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default StaticsData;