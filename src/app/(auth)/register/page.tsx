"use client"

import { useState } from "react"
import api from "@/utils/api";

import { Form, FormMessage, FormItem, FormTextLinkAlternative } from "@/components/ui/Form"
import Label from "@/components/ui/Label"
import TextField from "@/components/ui/TextField"
import Button from "@/components/ui/Button"

type FormData = {
    full_name: string
    username: string
    email: string
    password: string
    confirm_password: string
    isError: boolean
    isLoading: boolean
    message: string
}

export default function Page() {

    const [formData, setFormData] = useState<FormData>({
        full_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        isError: false,
        isLoading: false,
        message: ""
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { full_name, username, email, password, confirm_password } = formData;
            setFormData({ ...formData, isLoading: true, isError: false, message: "" });
            const response = await api.post("/auth/register", {
                full_name: full_name,
                username: username,
                email: email,
                password: password,
                confirm_password: confirm_password
            });
            setFormData({ ...formData, isLoading: false, isError: false, message: response.data.message });
            setTimeout(() => window.location.href = "/login", 3000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || error?.response?.data?.data[0].message || "An error occurred";
            setFormData({ ...formData, isLoading: false, isError: true, message: errorMessage });
        }
    }

    return (
        <div className="w-full max-w-md p-4 flex flex-col gap-4 shadow drop-shadow-sm border border-gray-200 bg-white">
            <div className="w-full">
                <h1 className="text-2xl font-bold text-gray-800">Register</h1>
                <p className="text-gray-600">Please enter your details</p>
            </div>
            {formData.message && <FormMessage isError={formData.isError} message={formData.message} />}
            <Form onSubmit={handleSubmit}>
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
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        required={true}
                        disabled={formData.isLoading}
                        isLoading={formData.isLoading}
                        isError={formData.isError}
                    />
                </FormItem>
                <FormItem>
                    <Label
                        htmlFor="username"
                        name="Username"
                        required={true}
                    />
                    <TextField
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required={true}
                        disabled={formData.isLoading}
                        isLoading={formData.isLoading}
                        isError={formData.isError}
                    />
                </FormItem>
                <FormItem>
                    <Label
                        htmlFor="email"
                        name="Email"
                        required={true}
                    />
                    <TextField
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required={true}
                        disabled={formData.isLoading}
                        isLoading={formData.isLoading}
                        isError={formData.isError}
                    />
                </FormItem>
                <FormItem>
                    <Label
                        htmlFor="password"
                        name="Password"
                        required={true}
                    />
                    <TextField
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required={true}
                        disabled={formData.isLoading}
                        isLoading={formData.isLoading}
                        isError={formData.isError}
                    />
                </FormItem>
                <FormItem>
                    <Label
                        htmlFor="confirm_password"
                        name="Confirm Password"
                        required={true}
                    />
                    <TextField
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                        required={true}
                        disabled={formData.isLoading}
                        isLoading={formData.isLoading}
                        isError={formData.isError}
                    />
                </FormItem>
                <FormItem>
                    <Button
                        name="Register"
                        type="submit"
                        fullWidth={true}
                        disabled={formData.isLoading}
                        isLoading={formData.isLoading}
                        className="bg-black text-white hover:bg-gray-800"
                    />
                </FormItem>
            </Form>
            <FormTextLinkAlternative
                alternativeText="Already have an account?"
                alternativeLinkText="Login"
                alternativeLinkHref="/login"
            />
        </div>
    )
}