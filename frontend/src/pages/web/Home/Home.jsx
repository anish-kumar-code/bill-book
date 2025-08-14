import React, { useEffect, useState } from 'react'
import Header from '../../../components/web/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from '../../../components/web/Footer'
import { getAllSettings } from '../../../services/apiSettings'
import { message } from 'antd'
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Home() {
    const [settingData, setSettingData] = useState({})
    const [loading, setLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState("https://plus.unsplash.com/premium_photo-1679923814036-8febf10a04c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")

    // const fetchSetting = async () => {
    //     try {
    //         const data = await getAllSettings()
    //         setSettingData(data.data.settings[0])
    //         // setImageUrl(`${BASE_URL}/${data.data.settings[0].logo}`)
    //     } catch (error) {
    //         message.error("Failed to load settings.")
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    // useEffect(() => {
    //     fetchSetting()
    // }, [])
    return (
        <>
            {/* <title>I</title> */}
            <div className="font-sans text-gray-800">
                {/* Fullscreen Image with Button */}
                <div
                    className="w-full h-screen bg-cover bg-center flex items-center justify-center"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                >
                    <a
                        href="/admin"
                        className="bg-black bg-opacity-70 text-white px-6 py-3 text-lg font-semibold rounded hover:bg-opacity-90 transition"
                    >
                        Go to Admin
                    </a>
                </div>
            </div>
        </>
    )
}
export default Home
