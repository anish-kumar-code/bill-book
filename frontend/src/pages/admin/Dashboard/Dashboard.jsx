import { Col, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import SalesOverview from './components/SalesOverview';
import SalesGraph from './components/SalesGraph';
import UserStatus from './components/UserStatus';
import RecentTransactions from './components/RecentTransactions';
import { getDashboard, getNewUser, getRecentTransaction } from '../../../services/admin/apiDashboard';
import NewUserList from './components/NewUserList';

function Dashboard() {
    // const [data, setData] = useState(dummyData);
    const [data, setData] = useState(null);
    const [recentData, setRecentData] = useState(null)
    const [newUser, setNewUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [recentLoading, setRecentLoading] = useState(true)
    const [newUserLoading, setNewUserLoading] = useState(true)

    useEffect(() => { fetchDashboard(), fetchRecentTransaction(), fetchNewUser() }, []);

    const fetchDashboard = async () => {
        try {
            const res = await getDashboard();
            setData(res);
        } catch (error) {
            console.error('Error fetching dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const fetchRecentTransaction = async () => {
        try {
            const res = await getRecentTransaction();
            setRecentData(res);
        } catch (error) {
            console.error('Error fetching dashboard data');
        } finally {
            setRecentLoading(false);
        }
    };

    const fetchNewUser = async () => {
        try {
            const res = await getNewUser();
            setNewUser(res);
        } catch (error) {
            console.error('Error fetching user data');
        } finally {
            setNewUserLoading(false);
        }
    };

    if (loading) return <Spin size="large" fullscreen />;

    return (
        <div className="p-4">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <SalesOverview data={data?.overview} />
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                    <SalesGraph data={data?.salesGraph} />
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                    <UserStatus data={data?.userStatus} />
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                    <RecentTransactions data={recentData} loading={recentLoading}/>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                    <NewUserList data={newUser} loading={newUserLoading} />
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;




// import { Col, message, Row, Spin } from 'antd'
// import React, { useEffect, useState } from 'react'
// import StaticsData from './components/StaticsData'
// import { getDashboard } from '../../../services/admin/apiDashboard'

// function Dashboard() {

//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true)

//     useEffect(() => { fetchDashboard() }, [])

//     const fetchDashboard = async () => {
//         try {
//             const res = await getDashboard();
//             setData(res)
//         } catch (error) {
//             message.error('Error fetching dashboard data');
//         } finally {
//             setLoading(false)
//         }
//     }
//     // if (loading) return <Spin size='large' fullscreen />
//     return (
//         <div className="p-4">
//             <Row gutter={[16, 16]}>
//                 <Col xs={24} sm={24} md={24} lg={24}>
//                     {data ? <StaticsData data={data} loading={loading} /> : <Spin size='large' />}
//                 </Col>
//             </Row>
//         </div>
//     )
// }

// export default Dashboard