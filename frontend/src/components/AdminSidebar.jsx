import React, { useEffect, useState } from 'react'
import { Avatar, Layout, Menu } from 'antd'
const { Sider } = Layout

import { useNavigate, useLocation } from 'react-router'

import { LuLayoutDashboard } from "react-icons/lu"
import { MdMessage } from 'react-icons/md'
import { FaSchool, FaSitemap, FaUserClock } from 'react-icons/fa'
import { FaArrowRightToBracket } from 'react-icons/fa6'
import { useAuth } from '../context/AuthContext'
import { IoSettingsOutline } from 'react-icons/io5'

const AdminSidebar = ({ collapsed, settingData }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // Derive path segments after '/admin'
    const pathSnippets = location.pathname.split('/').slice(2)
    const openKey = pathSnippets.length > 1 ? pathSnippets[0] : ''
    const rawSelected = pathSnippets[pathSnippets.length - 1] || 'dashboard'

    // Build a unique selectedKey when inside a submenu
    const selectedKey = openKey ? `${openKey}-${rawSelected}` : rawSelected
    const [openKeys, setOpenKeys] = useState(openKey ? [openKey] : [])

    useEffect(() => {
        setOpenKeys(openKey ? [openKey] : [])
    }, [openKey])

    const { adminLogout } = useAuth();

    const menuItems = [
        { type: 'divider' },
        { key: 'dashboard', icon: <LuLayoutDashboard size={18} />, label: 'Dashboard', onClick: () => navigate('/admin') },
        { key: 'user', icon: <MdMessage size={18} />, label: 'User', onClick: () => navigate('/admin/user') },
        // { key: 'enquiry', icon: <MdMessage size={18} />, label: 'Enquiry', onClick: () => navigate('/admin/enquiry') },
        // { key: 'college', icon: <FaSchool size={18} />, label: 'College', onClick: () => navigate('/admin/college') },
        {
            key: 'settings', icon: <IoSettingsOutline size={18} />, label: 'Settings', children: [
                // { key: 'settings-profile', label: 'Profile', onClick: () => navigate('/admin/settings/profile') },
                { key: 'settings-charges', icon: <FaSitemap />, label: 'Site', onClick: () => navigate('/admin/settings/charges') },
                {
                    key: 'user-cms', icon: <FaUserClock size={18} />, label: 'User CMS', children: [
                        { key: 'user-terms-and-conditions', label: 'Terms & Conditions', onClick: () => navigate('/admin/terms-and-conditions/user') },
                        { key: 'user-privacy-policy', label: 'Privacy Policy', onClick: () => navigate('/admin/privacy-policy/user') },
                        { key: 'user-refund-policy', label: 'Refund Policy', onClick: () => navigate('/admin/refund-policy/user') },
                        { key: 'user-about-us', label: 'About Us', onClick: () => navigate('/admin/about-us/user') }
                    ]
                },
            ]
        },
        { type: 'divider' },
        { key: 'logout', icon: <FaArrowRightToBracket size={18} />, label: 'Logout', onClick: () => { adminLogout(); navigate('/admin/login'); } }
    ]

    return (
        <Sider
            width={240}
            theme="light"
            collapsible
            collapsed={collapsed}
            trigger={null}
            className="shadow-md border-r"
            style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'auto' }}
        >
            <div className="flex items-center justify-center py-4">
                {/* <Avatar size={collapsed ? 40 : 64} src={`${BASE_URL}/${settingData.logo}`} className="transition-all duration-300" /> */}
                <img src={`${BASE_URL}/${settingData.logo}`} alt="" />
                {/* {!collapsed && <span className="ml-3 font-semibold text-2xl">{settingData.appName}</span>} */}
            </div>
            {/* <div className="flex items-center justify-center py-4">
                {!collapsed && <span className="ml-3 font-semibold text-2xl">IQEAA</span>}
            </div> */}
            <Menu
                mode="inline"
                theme="light"
                selectedKeys={[selectedKey]}
                openKeys={openKeys}
                onOpenChange={keys => setOpenKeys(keys)}
                items={menuItems}
                className="text-[15px] font-medium"
            />
        </Sider>
    )
}
export default AdminSidebar