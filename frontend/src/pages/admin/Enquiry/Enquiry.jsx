// import { Breadcrumb, Button, Input, message, Modal } from 'antd'
// import React, { useEffect, useState } from 'react'
// import { FaPlus } from 'react-icons/fa'
// import { Link } from 'react-router'
// import EnquiryTable from './components/EnquiryTable'
// import { getAllEnquiry } from '../../../services/admin/apiEnquiry'

// function Enquiry() {
//     const [user, setUser] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [searchText, setSearchText] = useState('');

//     const fetchUser = async () => {
//         setLoading(true);
//         try {
//             const res = await getAllEnquiry();
//             setUser(res.data?.newEnquiry);
//         } catch {
//             message.error("Failed to load user.");
//         } finally {
//             setLoading(false);
//         }
//     };
// console.log(user," these are the enquiry listiingsdddd")
//     useEffect(() => { fetchUser(); }, []);
//     return (
//         <>
//             <div className='lg:px-10 px-5 my-8 md:flex items-center gap-4 justify-between '>
//                 <Input.Search
//                     placeholder="Search by mobile no"
//                     onChange={(e) => setSearchText(e.target.value)}
//                     style={{
//                         maxWidth: 300,
//                         borderRadius: '6px'
//                     }}
//                     size="large"
//                 />
//             </div>
//             <EnquiryTable searchText={searchText} data={user} loading={loading} />
//         </>
//     )
// }

// export default Enquiry

import { Breadcrumb, Button, Input, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router';
import EnquiryTable from './components/EnquiryTable';
import { getAllEnquiry } from '../../../services/admin/apiEnquiry';

function Enquiry() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await getAllEnquiry();
            console.log(res.data?.newEnquiry, "these are the enquiry listings");
            setUser(res.data?.newEnquiry || []);
        } catch (error) {
            message.error("Failed to load user.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
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
            <EnquiryTable searchText={searchText} user={user} loading={loading} reloadFunc={fetchUser} />
        </>
    );
}

export default Enquiry;