"use client";

import secureLocalStorage from "react-secure-storage";
import { useState, useEffect } from "react";
import api from "@/utils/api";

import Unauthorized from "@/components/ui/Unauthorized";
import IconButton from "@/components/ui/IconButton";
import Modal from "@/components/ui/Modal";
import { Form, FormItem, FormMessage } from "@/components/ui/Form";
import Select from "@/components/ui/Select";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";

import { FaEdit, FaUserLock } from "react-icons/fa";

interface User {
    id: string;
    full_name: string;
    username: string;
    role: string;
    created_at: string;
    updated_at: string;
    isError: boolean
    isLoading: boolean
    message: string
}

const initialFormData: User = {
    id: "",
    full_name: "",
    username: "",
    role: "",
    created_at: "",
    updated_at: "",
    isError: false,
    isLoading: false,
    message: ""
};

interface UsersByRole {
    user: User[];
    admin: User[];
    contributor: User[];
    superadmin: User[];
}

interface RoleKey {
    key: keyof UsersByRole;
    label: string;
}

export default function Page() {
    const [role, setRole] = useState<string | null>(null);
    const [formData, setFormData] = useState(initialFormData);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [usersByRole, setUsersByRole] = useState<UsersByRole>({
        user: [],
        admin: [],
        contributor: [],
        superadmin: []
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [activeRole, setActiveRole] = useState<keyof UsersByRole>("user");

    const displayMessage = (isError: boolean, message: string) => {
        setFormData(prev => ({ ...prev, isError, isLoading: false, message }));
        setTimeout(() => setFormData(prev => ({ ...prev, isError: false, isLoading: false, message: "" })), 4000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getAllUsers = async () => {
        try {
            const response = await api.get("/users");
            const { data, message } = response.data;
            displayMessage(false, message);
            setUsersByRole(data.users_by_role);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || error?.response?.data?.data[0].message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    };

    useEffect(() => {
        getAllUsers();
        const role: any = secureLocalStorage.getItem("role");
        setRole(role);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setFormData(prev => ({ ...prev, isLoading: true }));
            const response = await api.patch(`/users`, {
                type: "update_role",
                id: formData.id,
                role: formData.role,
            });
            const { message } = response.data;

            displayMessage(false, message);
            getAllUsers();
            setModalOpen(false);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || error?.response?.data?.data[0].message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    };

    const roles: RoleKey[] = [
        { key: "user", label: "User" },
        { key: "contributor", label: "Contributor" },
        { key: "admin", label: "Admin" },
        { key: "superadmin", label: "Super Admin" },
    ];

    const filteredUsers = usersByRole[activeRole].filter(
        (user) =>
            user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {role !== "superadmin"
                ? <Unauthorized />
                : (
                    <>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-0.5">
                            <div className="flex flex-wrap gap-2">
                                {roles.map(({ key, label }) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveRole(key)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition hover:cursor-pointer 
                                ${activeRole === key
                                                ? "bg-black text-white"
                                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
                                    >
                                        {label} ({usersByRole[key].length})
                                    </button>
                                ))}
                            </div>

                            {/* Search Input */}
                            <div className="w-full md:w-72">
                                <input
                                    type="text"
                                    placeholder="Search full name or username..."
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="w-full bg-white p-4 rounded-md shadow">
                            <h2 className="text-lg font-semibold mb-4">
                                {roles.find((r) => r.key === activeRole)?.label} List
                            </h2>
                            <div className="w-full max-h-[60vh] overflow-auto border rounded-md">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 bg-black text-white">
                                        <tr>
                                            <th className="p-3 text-left">No</th>
                                            <th className="p-3 text-left">Full Name</th>
                                            <th className="p-3 text-left">Username</th>
                                            <th className="p-3 text-left">Role</th>
                                            <th className="p-3 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user, index) => (
                                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="text-center p-2">{index + 1}</td>
                                                <td className="p-2">{user.full_name}</td>
                                                <td className="p-2">@{user.username}</td>
                                                <td className="p-2">
                                                    <span className={`py-1.5 px-3 rounded-sm capitalize text-sm font-semibold text-nowrap
                                ${user.role === "superadmin" && "bg-red-100 text-red-600"}
                                ${user.role === "admin" && "bg-yellow-100 text-yellow-600"}
                                ${user.role === "contributor" && "bg-blue-100 text-blue-600"}
                                ${user.role === "user" && "bg-green-100 text-green-600"}
                            `}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="p-2 text-center">
                                                    {role === "superadmin" && (
                                                        <IconButton
                                                            id="change-role"
                                                            icon={<FaEdit className="w-4 h-4" />}
                                                            onClick={() => {
                                                                setFormData({ ...user });
                                                                setModalOpen(true);
                                                            }}
                                                            className="mx-auto text-gray-500 hover:text-gray-700 transition duration-200"
                                                            aria-label="Edit"
                                                            type="button"
                                                        />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredUsers.length === 0 && (
                                            <tr>
                                                <td colSpan={7} className="text-center p-4 text-gray-500">No matching users found</td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        </div>

                        <Modal
                            icon={<FaUserLock className="w-6 h-6" />}
                            isActive={modalOpen}
                            title="Change Role"
                            closeModal={() => setModalOpen(false)}
                            className="max-w-md"
                        >
                            <Form onSubmit={handleSubmit}>
                                {formData.message && (
                                    <FormMessage message={formData.message} isError={formData.isError} />
                                )}
                                <FormItem>
                                    <Label
                                        htmlFor="id"
                                        name="User ID"
                                        required
                                    />
                                    <TextField
                                        type="text"
                                        name="id"
                                        value={formData.id}
                                        onChange={handleChange}
                                        required={true}
                                        disabled={true}
                                        isLoading={formData.isLoading}
                                        isError={formData.isError}
                                    />
                                </FormItem>
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
                                <FormItem>
                                    <Label
                                        htmlFor="role"
                                        name="Role"
                                        required
                                    />
                                    <Select
                                        name="role"
                                        options={[
                                            { value: "user", label: "User" },
                                            { value: "admin", label: "Admin" },
                                            { value: "superadmin", label: "Super Admin" },
                                        ]}
                                        value={String(formData.role)}
                                        onChange={handleChange}
                                        required={true}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        isError={formData.isError}
                                    />
                                </FormItem>
                                <Button
                                    type="submit"
                                    name={"Change"}
                                    disabled={formData.isLoading}
                                    isLoading={formData.isLoading}
                                    fullWidth={true}
                                    className="border-black bg-black text-white hover:bg-gray-800 hover:text-white"
                                />
                            </Form>
                        </Modal>
                    </>
                )
            }
        </>
    )
}