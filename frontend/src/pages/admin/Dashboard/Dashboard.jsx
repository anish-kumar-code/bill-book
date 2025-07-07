import { Col, message, Row, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import StaticsData from './components/StaticsData'
import { getDashboard } from '../../../services/admin/apiDashboard'

function Dashboard() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => { fetchDashboard() }, [])

    const fetchDashboard = async () => {
        try {
            const res = await getDashboard();
            // console.log(res)
            setData(res)
            console.log(res, "dashboard data")
        } catch (error) {
            message.error('Error fetching dashboard data');
        } finally {
            setLoading(false)
        }
    }
    // if (loading) return <Spin size='large' fullscreen />
    return (
        <div className="p-4">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    {data ? <StaticsData data={data} loading={loading} /> : <Spin size='large' />}
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard