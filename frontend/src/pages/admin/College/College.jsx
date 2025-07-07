import { Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { getAllCollege } from '../../../services/admin/apiCollege'
import CollegeTable from './components/CollegeTable';

function College() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await getAllCollege();
            setUser(res.data?.collegeList);
            console.log(res.data, " these are the college listiing");
        } catch {
            message.error("Failed to load user.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { fetchUser(); }, []);
    return (
        <>
            <div className='lg:px-10 px-5 my-8 md:flex items-center gap-4 justify-between '>
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
            <CollegeTable searchText={searchText} data={user} loading={loading} />
        </>
    )
}
export default College;
