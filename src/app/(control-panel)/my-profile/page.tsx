"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";

import ProfileCard from "@/components/features/my-profile/ProfileCard";
import { Form, FormMessage, FormItem, FormSplit } from "@/components/ui/Form";
import Label from "@/components/ui/Label";
import TextField from "@/components/ui/TextField";

import Button from "@/components/ui/Button";
import { FaEdit } from "react-icons/fa";
import { HiUser, HiKey } from "react-icons/hi";


interface FormDataType {
    id: string;
    full_name: string;
    username: string;
    email: string;
    old_password: string,
    new_password: string,
    confirm_password: string
    role: string;
    point: number;
    badge: string;
    experience: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    isError: boolean
    isLoading: boolean
    message: string
}

export default function Page() {

    const [formData, setFormData] = useState<FormDataType>({
        id: "",
        full_name: "",
        username: "",
        email: "",
        old_password: "",
        new_password: "",
        confirm_password: "",
        role: "",
        point: 0,
        badge: "",
        experience: 0,
        created_at: "",
        updated_at: "",
        deleted_at: "",
        isError: false,
        isLoading: false,
        message: ""
    });
    const [myrank, setMyRank] = useState<number>(0);
    const [activeTab, setActiveTab] = useState<'profile' | 'edit' | 'password'>('profile');

    const displayMessage = (isError: boolean, message: string) => {
        setFormData(prev => ({ ...prev, isError, isLoading: false, message }));
        setTimeout(() => setFormData(prev => ({ ...prev, isError: false, isLoading: false, message: "" })), 4000);
    };

    const getMyProfile = async () => {
        setFormData(prev => ({ ...prev, isError: false, isLoading: true }));
        try {
            const response = await api.get("/account");
            const { data, message } = response.data;

            displayMessage(false, message);
            setFormData(data);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        } finally {
            setFormData(prev => ({ ...prev, isLoading: false }));
        }
    };

    const getMyRank = async () => {
        try {
            const response = await api.post('/leaderboard', {
                type: "search_by_me"
            });
            const { data } = response.data;
            setMyRank(data);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            console.error(errorMessage);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormData(prev => ({ ...prev, isError: false, isLoading: true }));
        try {
            const { full_name } = formData;
            const response = await api.patch("/account", {
                type: "update_detail_information",
                full_name: full_name
            });

            const { message } = response.data;
            displayMessage(false, message);
            setTimeout(() => window.location.reload(), 4000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { old_password, new_password, confirm_password } = formData;
            const response = await api.patch("/account", {
                type: "update_password",
                old_password: old_password,
                new_password: new_password,
                confirm_password: confirm_password
            });

            const { message } = response.data;
            displayMessage(false, message);
            setTimeout(() => window.location.reload(), 4000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    };

    useEffect(() => {
        getMyProfile();
        getMyRank();
    }, []);

    const tabs = [
        {
            id: 'profile',
            name: 'Profile Details',
            icon: HiUser,
            color: 'from-blue-500 to-indigo-500',
            bgColor: 'from-blue-50 to-indigo-50'
        },
        {
            id: 'edit',
            name: 'Edit Profile',
            icon: FaEdit,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'from-purple-50 to-pink-50',
        },
        {
            id: 'password',
            name: 'Security',
            icon: HiKey,
            color: 'from-green-500 to-emerald-500',
            bgColor: 'from-green-50 to-emerald-50',
        }
    ];

    return (
        <>
            {/* Modern Tab Container */}
            <div className="w-full bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                    <div className="flex overflow-x-auto scrollbar-hide divide-x divide-gray-200">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as 'profile' | 'edit' | 'password')}
                                    className={`group relative flex-1 px-4 py-5 transition-all duration-300 text-sm font-medium ${isActive ? 'bg-white shadow-sm z-10' : 'hover:bg-white/40'}`}
                                >
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? `bg-gradient-to-r ${tab.color} shadow-md` : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                                            <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'}`} />
                                        </div>
                                        <span className={`hidden md:block transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-800'}`}>
                                            {tab.name}
                                        </span>
                                    </div>
                                    {isActive && (
                                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.color} rounded-t-full`}>
                                            <div className="h-full bg-white/30 animate-pulse" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="w-full py-4">
                    {activeTab === 'profile' && (
                        <ProfileCard
                            isLoading={formData.isLoading}
                            data={formData}
                            myrank={myrank}
                        />
                    )}

                    {activeTab === 'edit' && (
                        <div className="w-full space-y-6">
                            <div className="w-full flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                    <FaEdit className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                                    <p className="text-gray-500">Update your personal information</p>
                                </div>
                            </div>
                            <Form onSubmit={handleEditProfile}>
                                {formData.message && (
                                    <FormMessage isError={formData.isError} message={formData.message} />
                                )}
                                <FormItem>
                                    <Label
                                        htmlFor="full_name"
                                        name="Full Name"
                                        required
                                    />
                                    <TextField
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required={true}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        isError={formData.isError}
                                    />
                                </FormItem>
                                <FormSplit>
                                    <Button
                                        type="submit"
                                        name={"Save Changes"}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        fullWidth={true}
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                    />
                                    <Button
                                        type="button"
                                        name={"Reset"}
                                        onClick={getMyProfile}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        fullWidth={true}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 border-gray-300"
                                    />
                                </FormSplit>
                            </Form>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <div className="w-full space-y-6">
                            <div className="w-full flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                                    <HiKey className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Security Settings</h2>
                                    <p className="text-gray-500">Update your password to keep your account secure</p>
                                </div>
                            </div>
                            <Form onSubmit={handleChangePassword}>
                                {formData.message && (
                                    <FormMessage isError={formData.isError} message={formData.message} />
                                )}
                                <FormItem>
                                    <Label
                                        htmlFor="old_password"
                                        name="Current Password"
                                        required
                                    />
                                    <TextField
                                        type={"password"}
                                        name="old_password"
                                        value={formData.old_password}
                                        onChange={handleChange}
                                        required={true}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        isError={formData.isError}
                                        className="pr-12"
                                    />
                                </FormItem>
                                <FormItem>
                                    <Label
                                        htmlFor="new_password"
                                        name="New Password"
                                        required
                                    />
                                    <TextField
                                        type={"password"}
                                        name="new_password"
                                        value={formData.new_password}
                                        onChange={handleChange}
                                        required={true}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        isError={formData.isError}
                                        className="pr-12"
                                    />
                                </FormItem>

                                <FormItem>
                                    <Label
                                        htmlFor="confirm_password"
                                        name="Confirm New Password"
                                        required
                                    />
                                    <TextField
                                        type={"password"}
                                        name="confirm_password"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        required={true}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        isError={formData.isError}
                                        className="pr-12"
                                    />
                                </FormItem>
                                <Button
                                    type="submit"
                                    name={"Save Changes"}
                                    disabled={formData.isLoading}
                                    isLoading={formData.isLoading}
                                    fullWidth={true}
                                    className="border-black bg-black text-white hover:bg-gray-800 hover:text-white"
                                />
                            </Form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}