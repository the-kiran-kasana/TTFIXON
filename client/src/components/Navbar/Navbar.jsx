"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdMailOutline, MdKeyboardArrowDown, MdPerson, MdSettings, MdLogout, MdChat } from "react-icons/md";
import { useSidebar } from "../../context/SidebarContext";

export default function Navbar() {
    const { collapsed } = useSidebar();
    const [showMessages, setShowMessages] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    
    const messagesRef = useRef(null);
    const profileRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (messagesRef.current && !messagesRef.current.contains(event.target)) {
                setShowMessages(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header
            className="fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-40 transition-all duration-300"
            style={{ left: collapsed ? "64px" : "256px" }}
        >
            {/* Left Side */}
            <div />

            {/* Right Side */}
            <div className="flex items-center gap-3">

                {/* Message Dropdown */}
                <div className="relative" ref={messagesRef}>
                    <button
                        onClick={() => setShowMessages(!showMessages)}
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-md transition-colors relative"
                    >
                        <MdMailOutline className="text-2xl" />
                        {/* Notification badge */}
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Messages Dropdown */}
                    {showMessages && (
                        <div
                            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                            style={{ top: "100%" }}
                        >
                            <div className="px-4 py- border-b border-gray-200 bg-gray-50">
                                <h3 className="font-semibold text-gray-900">Messages</h3>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {/* Sample messages */}
                                <Link
                                    href="/messages"
                                    // className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
                                    // onClick={() => setShowMessages(false)}
                                >
                                    {/* <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        JD
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                                        <p className="text-xs text-gray-500 truncate">Hey, how are you doing?</p>
                                    </div>
                                    <span className="text-xs text-gray-400">2m</span> */}
                                </Link>

                                <Link
                                    href="/messages"
                                    // className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
                                    onClick={() => setShowMessages(false)}
                                >
                                    {/* <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        SA
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">Sarah Anderson</p>
                                        <p className="text-xs text-gray-500 truncate">Meeting at 3pm today?</p>
                                    </div>
                                    <span className="text-xs text-gray-400">1h</span> */}
                                </Link>

                                <Link
                                    href="/messages"
                                    //className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                                    onClick={() => setShowMessages(false)}
                                >
                                    {/* <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        MK
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">Mike Kumar</p>
                                        <p className="text-xs text-gray-500 truncate">Thanks for your help!</p>
                                    </div>
                                    <span className="text-xs text-gray-400">3h</span> */}
                                </Link>
                            </div>
                            <Link
                                href="/messages"
                                className="block px-4 py-3 text-center text-sm text-blue-600 hover:bg-gray-50 font-medium border-t border-gray-200"
                                onClick={() => setShowMessages(false)}
                            >
                                View all messages
                            </Link>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-gray-200" />

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <div
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
                    >
                        <Image
                            src="/Profile-icon.jpg"
                            alt="Profile"
                            width={36}
                            height={36}
                            className="rounded-full object-cover"
                            style={{ width: "36px", height: "36px" }}
                        />
                        <MdKeyboardArrowDown
                            className="text-gray-500 text-lg transition-transform"
                            style={{ transform: showProfile ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                    </div>

                    {/* Profile Dropdown */}
                    {showProfile && (
                        <div
                            className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                            style={{ top: "100%" }}
                        >
                            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                                <p className="text-sm font-semibold text-gray-900">Admin User</p>
                                <p className="text-xs text-gray-500">admin@ondemand.com</p>
                            </div>
                            
                            <div className="py-1">
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    onClick={() => setShowProfile(false)}
                                >
                                    <MdPerson className="text-lg text-gray-500" />
                                    My Profile
                                </Link>
                                
                                <Link
                                    href="/settings"
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    onClick={() => setShowProfile(false)}
                                >
                                    <MdSettings className="text-lg text-gray-500" />
                                    Settings
                                </Link>
                            </div>

                            <div className="border-t border-gray-200">
                                <button
                                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    onClick={() => {
                                        setShowProfile(false);
                                        // Add logout logic here
                                    }}
                                >
                                    <MdLogout className="text-lg" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}
