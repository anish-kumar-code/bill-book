import { Input, message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../../services/admin/apiList';
import UserTable from './components/UserTable';

const { TabPane } = Tabs;

function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const fetchUsers = async (tab) => {
        setLoading(true);
        try {
            const res = await getUser(tab);
            setUsers(res.data?.data.users || []);
        } catch {
            message.error("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(activeTab);
    }, [activeTab]);

    const handleTabChange = (key) => {
        setActiveTab(key);
        fetchUsers(key); // Fetch data when tab changes
    };

    return (
        <>
            <div className='lg:px-10 px-5 my-8 md:flex items-center gap-4 justify-between'>
                <Tabs activeKey={activeTab} onChange={handleTabChange} className="mb-4">
                    <TabPane tab="New Users" key="new" />
                    <TabPane tab="Active Users" key="active" />
                    <TabPane tab="Inactive Users" key="inactive" />
                    <TabPane tab="Paid Users" key="paid" />
                    <TabPane tab="Unpaid Users" key="unpaid" />
                    <TabPane tab="All Users" key="all" />
                </Tabs>
                <Input.Search
                    placeholder="Search by mobile no or name"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                        maxWidth: 300,
                        borderRadius: '6px'
                    }}
                    size="large"
                />
            </div>
            <UserTable
                searchText={searchText}
                data={users}
                loading={loading}
                refreshData={() => fetchUsers(activeTab)}
            />
        </>
    );
}

export default User;