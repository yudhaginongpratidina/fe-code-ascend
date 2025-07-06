"use client";
import { useParams } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import { useState, useEffect, useMemo } from "react";
import api from "@/utils/api";

import { Form, FormItem, FormMessage, FormSplit } from "@/components/ui/Form";
import Label from "@/components/ui/Label";
import TextField from "@/components/ui/TextField";
import Select from "@/components/ui/Select";
import IconButton from "@/components/ui/IconButton";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import MarkdownEditor from "@/components/ui/MarkdownEditor";
import Checkbox from "@/components/ui/Checkbox";
import { MdOutlineRestore } from "react-icons/md";


type FormDataType = {
    id: number | string;
    module_id: number | string;
    title: string;
    content: string;
    with_question: boolean;
    question: string;
    answer_1: string;
    answer_2: string;
    answer_3: string;
    correct_answer: string;
    is_published: string;
    confirm_delete: string;
    isError: boolean
    isLoading: boolean
    message: string
}

const initialFormData: FormDataType = {
    id: 0,
    module_id: 0,
    title: "",
    content: "",
    with_question: false,
    question: "",
    answer_1: "",
    answer_2: "",
    answer_3: "",
    correct_answer: "",
    is_published: "",
    confirm_delete: "",
    isError: false,
    isLoading: false,
    message: ""
}

type DataModule = {
    id: string | number;
    title: string;
    level: string;
    free: boolean;
    point_required: number;
}

type DataChapter = {
    id: string | number;
    title: string;
    point_earned: number;
    exp_earned: number;
    with_question: boolean;
    is_published: boolean;
    is_deleted: boolean;
}

const PUBLISH_OPTIONS = [
    { value: "false", label: "Unpublished" },
    { value: "true", label: "Published" },
];

export default function Page() {
    const { moduleId } = useParams();
    const [role, setRole] = useState<string | null>(null);
    const [module, setModule] = useState<DataModule | null>(null);
    const [chapters, setChapters] = useState<DataChapter[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "deleted">("all");

    const [formTitle, setFormTitle] = useState<string>("create");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalConfirmDelete, setModalConfirmDelete] = useState<boolean>(false);
    const [modalConfirmRestore, setModalConfirmRestore] = useState<boolean>(false);

    const [withQuestion, setWithQuestion] = useState<boolean>(false);
    const [formData, setFormData] = useState(initialFormData);

    // Filter chapters based on search term and filter status
    const filteredChapters = useMemo(() => {
        return chapters
            .filter(chapter =>
                chapter.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(chapter => {
                if (filterStatus === "all") return true;
                if (filterStatus === "active") return !chapter.is_deleted;
                if (filterStatus === "deleted") return chapter.is_deleted;
                return true;
            });
    }, [chapters, searchTerm, filterStatus]);

    const fetchDataModuleByModuleId = async () => {
        try {
            setFormData(prev => ({ ...prev, isLoading: true }));
            const response = await api.post(`/modules/search`, {
                type: "search_by_id",
                value: moduleId
            });
            const { data } = response.data;
            setModule(data);
            setFormData(prev => ({ ...prev, isLoading: false }));
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            displayMessage(true, errorMessage);
            setFormData(prev => ({ ...prev, isLoading: false }));
        }
    }

    const fetchDataByModuleId = async () => {
        try {
            setFormData(prev => ({ ...prev, isLoading: true }));
            const response = await api.post(`/chapters/search`, {
                type: "module_id_only_by_creator_id",
                value: moduleId
            });
            const { data } = response.data;
            setChapters(data);
            setFormData(prev => ({ ...prev, isLoading: false }));
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            displayMessage(true, errorMessage);
            setFormData(prev => ({ ...prev, isLoading: false }));
        }
    }

    const handleOpenModal = async (title: string, id?: number | string) => {
        setFormData(initialFormData);

        if (title === "create") {
            setFormTitle("create");
            setWithQuestion(false);
            setModalOpen(true);
            return;
        }

        if (title === "edit" && id) {
            setFormTitle("edit");
            try {
                setFormData(prev => ({ ...prev, isLoading: true }));
                const response = await api.post(`/chapters/search`, {
                    type: "search_by_id_only_by_creator_id",
                    value: id
                });

                const { message, data } = response.data;
                setModalOpen(true);
                displayMessage(false, message);

                // Update form data
                setFormData({
                    ...initialFormData,
                    id: data.id,
                    module_id: data.module_id,
                    title: data.title,
                    content: data.content,
                    with_question: data.with_question,
                    question: data.question || "",
                    answer_1: data.answer_1 || "",
                    answer_2: data.answer_2 || "",
                    answer_3: data.answer_3 || "",
                    correct_answer: data.correct_answer || "",
                    is_published: data.is_published ? "true" : "false"
                });

                setWithQuestion(data.with_question || false);
                setFormData(prev => ({ ...prev, isLoading: false }));
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message ||
                    error?.response?.data[0]?.message ||
                    error?.response?.data?.data[0].message ||
                    "An error occurred";
                displayMessage(true, errorMessage);
                setFormData(prev => ({ ...prev, isLoading: false }));
            }
        }
    }

    const handleModalConfirmDelete = (id: number | string) => {
        if (id) {
            setFormData(prev => ({ ...prev, id }));
            setModalConfirmDelete(true);
        }
    }

    const handleModalConfirmRestore = async (id: number | string) => {
        try {
            setFormData(prev => ({ ...prev, isLoading: true }));
            const response = await api.post(`/chapters/search`, {
                type: "search_by_id_only_by_creator_id",
                value: id
            });
            const { message, data } = response.data;
            setFormData(prev => ({
                ...prev,
                id: data.id,
                title: data.title
            }));
            setModalConfirmRestore(true);
            displayMessage(false, message);
            setFormData(prev => ({ ...prev, isLoading: false }));
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message ||
                error?.response?.data[0]?.message ||
                error?.response?.data?.data[0].message ||
                "An error occurred";
            displayMessage(true, errorMessage);
            setFormData(prev => ({ ...prev, isLoading: false }));
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const displayMessage = (isError: boolean, message: string) => {
        setFormData(prev => ({ ...prev, isError, isLoading: false, message }));
        setTimeout(() => setFormData(prev => ({ ...prev, isError: false, isLoading: false, message: "" })), 4000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormData(prev => ({ ...prev, isLoading: true }));

        try {
            const isPublished = formData.is_published === "true";
            const payload = {
                module_id: moduleId,
                title: formData.title,
                content: formData.content,
                with_question: withQuestion,
                is_published: isPublished,
                ...(withQuestion && {
                    question: formData.question,
                    answer_1: formData.answer_1,
                    answer_2: formData.answer_2,
                    answer_3: formData.answer_3,
                    correct_answer: formData.correct_answer,
                })
            };

            // Create or update based on form title
            const response = await (formTitle === "create"
                ? api.post(`/chapters`, payload)
                : api.patch(`/chapters`, { ...payload, id: formData.id })
            );

            const { message } = response.data;
            displayMessage(false, message);

            setTimeout(() => {
                setModalOpen(false);
                setFormData(initialFormData);
                fetchDataByModuleId(); // Refresh data instead of reloading page
            }, 2000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message ||
                error?.response?.data[0]?.message ||
                error?.response?.data?.data[0].message ||
                "An error occurred";
            displayMessage(true, errorMessage);
        } finally {
            setFormData(prev => ({ ...prev, isLoading: false }));
        }
    }

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.confirm_delete !== "DELETE CHAPTER") {
            displayMessage(true, "Please type 'DELETE CHAPTER' to confirm");
            return;
        }

        try {
            setFormData(prev => ({ ...prev, isLoading: true }));
            const response = await api.delete(`/chapters/${formData.id}`);
            const { message } = response.data;
            displayMessage(false, message);

            setTimeout(() => {
                setModalConfirmDelete(false);
                fetchDataByModuleId();
            }, 2000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message ||
                error?.response?.data[0]?.message ||
                error?.response?.data?.data[0].message ||
                "An error occurred";
            displayMessage(true, errorMessage);
        } finally {
            setFormData(prev => ({ ...prev, isLoading: false }));
        }
    }

    const handleRestore = async (e: React.MouseEvent, id: number | string) => {
        e.preventDefault();
        try {
            setFormData(prev => ({ ...prev, isLoading: true }));
            const response = await api.patch(`/chapters/${id}`);
            const { message } = response.data;
            displayMessage(false, message);

            setTimeout(() => {
                setModalConfirmRestore(false);
                fetchDataByModuleId();
            }, 2000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message ||
                error?.response?.data[0]?.message ||
                error?.response?.data?.data[0].message ||
                "An error occurred";
            displayMessage(true, errorMessage);
        } finally {
            setFormData(prev => ({ ...prev, isLoading: false }));
        }
    }

    useEffect(() => {
        const role: any = secureLocalStorage.getItem("role");
        setRole(role);
        fetchDataModuleByModuleId();
        fetchDataByModuleId();
    }, []);

    return (
        <>
            {role === "superadmin" || role === "admin" || role === "contributor"
                ? (
                    <>
                        {module && (
                            <div className="p-4 bg-gray-50 rounded-sm border border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase">Module Title</span>
                                        <span className="font-medium capitalize">{module.title}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase">Level</span>
                                        <span className="font-medium capitalize">{module.level}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase">Points Required</span>
                                        <span className="font-medium">{module.point_required}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase">Access Type</span>
                                        <span className="font-medium">
                                            {module.free ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Free
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    Premium
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="w-full">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold">Total Data</h2>
                                    <p className="text-sm text-gray-500">{chapters.length} chapters</p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                                    <TextField
                                        type="search"
                                        name="search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        required={false}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        isError={false}
                                    />
                                    <Select
                                        name="filter_status"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "deleted")}
                                        options={
                                            [
                                                { value: "all", label: "All Chapters" },
                                                { value: "active", label: "Active Only" },
                                                { value: "deleted", label: "Deleted Only" },
                                            ]
                                        }
                                        required={false}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        isError={false}
                                    />
                                    <Button
                                        name="New"
                                        type="button"
                                        onClick={() => handleOpenModal("create")}
                                        className="border-transparent bg-black text-white hover:bg-gray-800 hover:text-white"
                                        disabled={false}
                                        isLoading={false}
                                        fullWidth={false}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-[40vh] overflow-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="sticky top-0 bg-gray-50 border-b border-gray-200">
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EXP</th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredChapters.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="p-4 text-center text-gray-500">
                                                {searchTerm ? "No chapters match your search" : "No chapters available"}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredChapters.map((chapter, index) => (
                                            <tr
                                                key={chapter.id}
                                                className={`hover:bg-gray-50 ${chapter.is_deleted ? 'bg-red-50' : ''}`}
                                            >
                                                <td className="p-3 whitespace-nowrap">{index + 1}</td>
                                                <td className="p-3 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{chapter.title}</div>
                                                </td>
                                                <td className="p-3 whitespace-nowrap">{chapter.point_earned}</td>
                                                <td className="p-3 whitespace-nowrap">{chapter.exp_earned}</td>
                                                <td className="p-3 whitespace-nowrap">
                                                    {chapter.with_question ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            Yes
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            No
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-3 whitespace-nowrap">
                                                    <div className="flex flex-col gap-1">
                                                        {chapter.is_published ? (
                                                            <span className="inline-flex justify-center items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                Published
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex justify-center items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                Draft
                                                            </span>
                                                        )}

                                                        {chapter.is_deleted && (
                                                            <span className="inline-flex justify-center items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                                Deleted
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-3 whitespace-nowrap text-center">
                                                    <div className="flex justify-center items-center gap-2">
                                                        {!chapter.is_deleted ? (
                                                            <>
                                                                <IconButton
                                                                    id="edit"
                                                                    icon={<FaEdit className="w-4 h-4 text-orange-600" />}
                                                                    onClick={() => handleOpenModal("edit", chapter.id)}
                                                                    className="text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 p-2 rounded-full transition duration-200"
                                                                    aria-label="Edit"
                                                                    type="button"
                                                                />
                                                                <IconButton
                                                                    id="delete"
                                                                    icon={<FaTrash className="w-4 h-4 text-red-600" />}
                                                                    onClick={() => handleModalConfirmDelete(chapter.id)}
                                                                    className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 p-2 rounded-full transition duration-200"
                                                                    aria-label="Delete"
                                                                    type="button"
                                                                />
                                                            </>
                                                        ) : (
                                                            <IconButton
                                                                id="restore"
                                                                icon={<MdOutlineRestore className="w-4 h-4 text-green-600" />}
                                                                onClick={() => handleModalConfirmRestore(chapter.id)}
                                                                className="text-green-600 hover:text-green-800 bg-green-100 hover:bg-green-200 p-2 rounded-full transition duration-200"
                                                                aria-label="Restore"
                                                                type="button"
                                                            />
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            icon={<IoIosCreate className="w-6 h-6" />}
                            isActive={modalOpen}
                            title={formTitle === "create" ? "New" : "Edit"}
                            closeModal={() => setModalOpen(false)}
                            className="max-w-6xl"
                        >
                            <Form onSubmit={handleSubmit}>
                                {formData.message && (
                                    <FormMessage message={formData.message} isError={formData.isError} />
                                )}
                                {formTitle === "edit" && (
                                    <>
                                        <FormItem>
                                            <Label htmlFor="title" name="Module ID" required />
                                            <TextField
                                                type="text"
                                                name="ID"
                                                value={String(formData.module_id)}
                                                onChange={handleChange}
                                                required={true}
                                                disabled={formData.isLoading}
                                                isLoading={formData.isLoading}
                                                isError={formData.isError}
                                            />
                                        </FormItem>
                                    </>
                                )}
                                <FormItem>
                                    <Label htmlFor="title" name="Title" required />
                                    <TextField
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required={true}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        isError={formData.isError}
                                    />
                                </FormItem>
                                <FormItem>
                                    <Label
                                        htmlFor="content"
                                        name="Content"
                                        required
                                    />
                                    <MarkdownEditor
                                        dataColorMode={"light"}
                                        mode={"edit"}
                                        value={formData.content}
                                        onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                                    />
                                </FormItem>
                                <FormItem>
                                    <Checkbox
                                        name="with_question"
                                        checked={withQuestion}
                                        onChange={(e) => setWithQuestion(e.target.checked)}
                                        required={false}
                                    />
                                </FormItem>
                                {withQuestion && (
                                    <>
                                        <FormItem>
                                            <Label
                                                htmlFor="questin"
                                                name="Question"
                                                required
                                            />
                                            <MarkdownEditor
                                                dataColorMode={"light"}
                                                mode={"edit"}
                                                value={formData.question}
                                                onChange={(value) => setFormData(prev => ({ ...prev, question: value }))}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <Label
                                                htmlFor="answer_1"
                                                name="Answer 1"
                                                required
                                            />
                                            <MarkdownEditor
                                                dataColorMode={"light"}
                                                mode={"edit"}
                                                value={formData.answer_1}
                                                onChange={(value) => setFormData(prev => ({ ...prev, answer_1: value }))}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <Label
                                                htmlFor="answer_2"
                                                name="Answer 2"
                                                required
                                            />
                                            <MarkdownEditor
                                                dataColorMode={"light"}
                                                mode={"edit"}
                                                value={formData.answer_2}
                                                onChange={(value) => setFormData(prev => ({ ...prev, answer_2: value }))}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <Label
                                                htmlFor="answer_3"
                                                name="Answer 3"
                                                required
                                            />
                                            <MarkdownEditor
                                                dataColorMode={"light"}
                                                mode={"edit"}
                                                value={formData.answer_3}
                                                onChange={(value) => setFormData(prev => ({ ...prev, answer_3: value }))}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <Label
                                                htmlFor="correct_answer"
                                                name="Correct Answer"
                                                required
                                            />
                                            <MarkdownEditor
                                                dataColorMode={"light"}
                                                mode={"edit"}
                                                value={formData.correct_answer}
                                                onChange={(value) => setFormData(prev => ({ ...prev, correct_answer: value }))}
                                            />
                                        </FormItem>
                                    </>
                                )}
                                <FormItem>
                                    <Label
                                        htmlFor="is_published"
                                        name="Visibility"
                                        required
                                    />
                                    <Select
                                        name="is_published"
                                        options={[
                                            { value: "false", label: "Draft - Not Published" },
                                            { value: "true", label: "Published - Visible to Users" }
                                        ]}
                                        value={formData.is_published}
                                        onChange={handleChange}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        isError={formData.isError}
                                        required={true}
                                    />
                                </FormItem>
                                <Button
                                    type="submit"
                                    name={formTitle === "create" ? "Create" : "Update"}
                                    disabled={formData.isLoading}
                                    isLoading={formData.isLoading}
                                    fullWidth={true}
                                    className="border-black bg-black text-white hover:bg-gray-800 hover:text-white"
                                />
                            </Form>
                        </Modal>

                        {/* Delete Confirmation Modal */}
                        <Modal
                            icon={<FaTrash className="w-6 h-6 text-red-500" />}
                            isActive={modalConfirmDelete}
                            title="Confirm Delete"
                            closeModal={() => setModalConfirmDelete(false)}
                            className="max-w-lg"
                        >
                            <Form onSubmit={handleDelete}>
                                {formData.message && (
                                    <FormMessage message={formData.message} isError={formData.isError} />
                                )}

                                <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
                                    <p className="text-sm">
                                        Are you sure you want to delete this chapter? This action can be reversed later.
                                    </p>
                                </div>

                                <div className="w-full">
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        To confirm deletion, please type <span className="font-bold">DELETE CHAPTER</span>
                                    </p>
                                    <FormItem>
                                        <TextField
                                            type="text"
                                            name="confirm_delete"
                                            value={String(formData.confirm_delete)}
                                            onChange={handleChange}
                                            required={true}
                                            disabled={formData.isLoading}
                                            isLoading={formData.isLoading}
                                            isError={formData.isError}
                                        />
                                    </FormItem>
                                </div>
                                <FormSplit>
                                    <Button
                                        type="button"
                                        name={"Cancel"}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        fullWidth={true}
                                        className="border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                                    />
                                    <Button
                                        type="submit"
                                        name={"Delete"}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        fullWidth={true}
                                        className="bg-red-600 text-white hover:bg-red-700"
                                    />
                                </FormSplit>
                            </Form>
                        </Modal>

                        {/* Restore Confirmation Modal */}
                        <Modal
                            icon={<MdOutlineRestore className="w-6 h-6 text-green-500" />}
                            isActive={modalConfirmRestore}
                            title="Restore Chapter"
                            closeModal={() => setModalConfirmRestore(false)}
                            className="max-w-lg"
                        >
                            <div className="mb-6">
                                {formData.message && (
                                    <FormMessage message={formData.message} isError={formData.isError} />
                                )}
                                <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4">
                                    <p className="text-sm">
                                        Are you sure you want to restore this deleted chapter? The chapter will be available again in your module.
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-md p-4 mb-4">
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="flex">
                                            <span className="font-medium w-24">ID:</span>
                                            <span>{formData.id}</span>
                                        </div>
                                        <div className="flex">
                                            <span className="font-medium w-24">Title:</span>
                                            <span>{formData.title}</span>
                                        </div>
                                    </div>
                                </div>

                                <FormSplit>
                                    <Button
                                        type="button"
                                        name={"Cancel"}
                                        onClick={() => setModalConfirmRestore(false)}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        fullWidth={true}
                                        className="border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                                    />
                                    <Button
                                        type="submit"
                                        name={"Restore"}
                                        onClick={(e: React.MouseEvent) => handleRestore(e, formData.id)}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        fullWidth={true}
                                        className="bg-green-600 text-white hover:bg-green-700"
                                    />
                                </FormSplit>
                            </div>
                        </Modal>
                    </>)
                : ""
            }
        </>
    )
}