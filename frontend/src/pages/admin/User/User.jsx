import { Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getList } from '../../../services/admin/apiList';
import UserTable from './components/UserTable';

function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await getList();
            setUsers(res.data?.data.users || []);
        } catch {
            message.error("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div className='lg:px-10 px-5 my-8 md:flex items-center gap-4 justify-between'>
                <Input.Search
                    placeholder="Search by mobile no"
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
                refreshData={fetchUsers}
            />
        </>
    );
}

export default User;
