"use client"

import secureLocalStorage from "react-secure-storage";
import { useState } from "react"
import api from "@/utils/api";
import { jwtDecode } from "jwt-decode";

import { Form, FormItem, FormMessage, FormTextLinkAlternative } from "@/components/ui/Form"
import Label from "@/components/ui/Label"
import TextField from "@/components/ui/TextField"
import Button from "@/components/ui/Button"

type FormData = {
    username_or_email: string
    password: string
    isError: boolean
    isLoading: boolean
    message: string
}

export default function Page() {

    const [formData, setFormData] = useState<FormData>({
        username_or_email: "",
        password: "",
        isError: false,
        isLoading: false,
        message: ""
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { username_or_email, password } = formData;
            setFormData({ ...formData, isLoading: true, isError: false, message: "" });

            if (username_or_email.includes("@")) {
                const response = await api.post("/auth/login", {
                    type: "login_with_email",
                    email: username_or_email,
                    password: password,
                });
                const { token, message } = response.data;
                const decodedToken: any = jwtDecode(token);
                secureLocalStorage.setItem("is_login", true);
                secureLocalStorage.setItem("token", token);
                secureLocalStorage.setItem("role", decodedToken.role);
                setFormData({ ...formData, isLoading: false, isError: false, message: message });
            } else {
                const response = await api.post("/auth/login", {
                    type: "login_with_username",
                    username: username_or_email,
                    password: password,
                });
                const { token, message } = response.data
                const decodedToken: any = jwtDecode(token);
                secureLocalStorage.setItem("is_login", true);
                secureLocalStorage.setItem("token", token);
                secureLocalStorage.setItem("role", decodedToken.role);
                setFormData({ ...formData, isLoading: false, isError: false, message: message });
            }
            setTimeout(() => window.location.href = "/dashboard", 3000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || error?.response?.data?.data[0].message || "An error occurred";
            setFormData({ ...formData, isLoading: false, isError: true, message: errorMessage });
        }
    }

    return (
        <div className="w-full max-w-md p-4 flex flex-col gap-4 shadow drop-shadow-sm border border-gray-200 bg-white">
            <div className="w-full">
                <h1 className="text-2xl font-bold text-gray-800">Login</h1>
                <p className="text-gray-600">Login to your account</p>
            </div>
            {formData.message && <FormMessage isError={formData.isError} message={formData.message} />}
            <Form onSubmit={handleSubmit}>
                <FormItem>
                    <Label
                        htmlFor="username_or_email"
                        name="Username or Email"
                        required
                    />
                    <TextField
                        type="email"
                        name="username_or_email"
                        value={formData.username_or_email}
                        onChange={(e) => setFormData({ ...formData, username_or_email: e.target.value })}
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
                    <Button
                        name="Login"
                        type="submit"
                        fullWidth={true}
                        disabled={formData.isLoading}
                        isLoading={formData.isLoading}
                        className="bg-black text-white hover:bg-gray-800"
                    />
                </FormItem>
            </Form>
            <FormTextLinkAlternative
                alternativeText="Don't have an account?"
                alternativeLinkText="Sign up"
                alternativeLinkHref="/register"
            />
        </div>
    )
}