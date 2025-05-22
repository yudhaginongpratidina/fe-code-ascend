"use client";

import { useState, useEffect } from "react";
import api from "@/utils/api";

import { Form, FormSplit, FormItem, FormMessage } from "@/components/ui/Form";
import Label from "@/components/ui/Label";
import TextField from "@/components/ui/TextField";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import Modal from "@/components/ui/Modal";
import MarkdownEditor from "@/components/ui/MarkdownEditor";

import { FaList, FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineRestore } from "react-icons/md";

type LevelType = "beginner" | "intermediate" | "advanced";
type GroupingType = "all" | "active" | "deleted";

interface FormDataType {
    module_id: string | number;
    title: string;
    description: string;
    level: LevelType;
    is_free: boolean | string;
    is_published: boolean | string;
    confirm_delete: string;
    isError: boolean
    isLoading: boolean
    message: string

}

interface DataModule {
    id: string | number;
    title: string;
    description: string;
    level: string;
    is_published: boolean;
    is_free: boolean;
    points_required: number;
    is_deleted: boolean;
}

const INITIAL_FORM_DATA: FormDataType = {
    module_id: "",
    title: "",
    description: "",
    level: "beginner",
    is_free: false,
    is_published: false,
    confirm_delete: "",
    isError: false,
    isLoading: false,
    message: "",
};

const LEVEL_OPTIONS = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
];

const BOOLEAN_OPTIONS = [
    { value: "false", label: "No" },
    { value: "true", label: "Yes" },
];

const PUBLISH_OPTIONS = [
    { value: "false", label: "Unpublished" },
    { value: "true", label: "Published" },
];

const GROUP_OPTIONS = [
    { value: "all", label: "All Modules" },
    { value: "active", label: "Active Modules" },
    { value: "deleted", label: "Deleted Modules" },
];

export default function Page() {
    // State management
    const [formTitle, setFormTitle] = useState<string>("create");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalConfirmDelete, setModalConfirmDelete] = useState<boolean>(false);
    const [modalConfirmRestore, setModalConfirmRestore] = useState<boolean>(false);
    const [modules, setModules] = useState<DataModule[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [grouping, setGrouping] = useState<GroupingType>("all");
    const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA);

    // Fetch modules on component mount
    useEffect(() => {
        fetchModules();
    }, []);

    // Filter and group modules based on search query and grouping selection
    const filteredModules = modules.filter(module => {
        // First apply search filter
        const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase());

        // Then apply grouping filter
        if (grouping === "all") return matchesSearch;
        if (grouping === "active") return matchesSearch && !module.is_deleted;
        if (grouping === "deleted") return matchesSearch && module.is_deleted;

        return matchesSearch; // Default fallback
    });

    // Stats for module groups
    const moduleStats = {
        all: modules.length,
        active: modules.filter(m => !m.is_deleted).length,
        deleted: modules.filter(m => m.is_deleted).length
    };

    // API calls
    const fetchModules = async () => {
        try {
            // setFormData(prev => ({ ...prev, isLoading: true }));
            setFormData(prev => ({ ...prev, isLoading: true }));
            const response = await api.post("/modules/search", {
                type: "search_by_me"
            });
            const { data } = response.data;
            setModules(data);
        } catch (error: any) {
            displayErrorMessage(error);
        } finally {
            setFormData(prev => ({ ...prev, isLoading: false }));
        }
    };

    const fetchModuleById = async (id: string | number) => {
        try {
            setFormData(prev => ({ ...prev, isLoading: true }));
            const response = await api.post(`/modules/search`, {
                type: "search_by_id",
                value: id
            });

            const { data } = response.data;
            // console.log(data);

            setFormData({
                module_id: id,
                title: data.title,
                description: data.description,
                level: data.level as LevelType,
                is_free: data.free ? "true" : "false",
                is_published: data.is_published ? "true" : "false",
                confirm_delete: "",
                isError: false,
                isLoading: false,
                message: ""
            });
        } catch (error: any) {
            displayErrorMessage(error);
        } finally {
            setFormData(prev => ({ ...prev, isLoading: false }));
        }
    };

    // Event handlers
    const handleOpenModal = async (action: string, id?: number | string) => {
        resetForm();

        if (action === "create") {
            setFormTitle("create");
            setModalOpen(true);
            return;
        }

        if (action === "edit" && id) {
            setFormTitle("edit");
            await fetchModuleById(id);
            setModalOpen(true);
        }
    };

    const handleModalConfirmDelete = (id: number | string) => {
        if (id) {
            setFormData(prev => ({ ...prev, module_id: id }));
            setModalConfirmDelete(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMarkdownChange = (value: string) => {
        setFormData(prev => ({ ...prev, description: value }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleGroupingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGrouping(e.target.value as GroupingType);
    };

    // Form submissions
    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setFormData(prev => ({ ...prev, isLoading: true }));

            const { title, description, level } = formData;

            if (!title || !description || !level) {
                return displayMessage(true, "Please fill in all required fields");
            }

            const response = await api.post("/modules", {
                title,
                description,
                level
            });

            displayMessage(false, response.data.message);
            handleSuccessAndReset();
        } catch (error: any) {
            displayErrorMessage(error);
        } finally {
            setFormData(prev => ({ ...prev, isLoading: false }));
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setFormData(prev => ({ ...prev, isLoading: true }));

            const { module_id, title, description, level } = formData;

            if (!title || !description || !level) {
                return displayMessage(true, "Please fill in all required fields");
            }

            // Convert string values to boolean for API
            const isFree = formData.is_free === "true" || formData.is_free === true;
            const isPublished = formData.is_published === "true" || formData.is_published === true;

            const response = await api.patch("/modules", {
                module_id,
                title,
                description,
                level,
                is_free: isFree,
                is_published: isPublished
            });

            displayMessage(false, response.data.message);
            handleSuccessAndReset();
        } catch (error: any) {
            displayErrorMessage(error);
        } finally {
            setFormData(prev => ({ ...prev, isLoading: false }));

        }
    };

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (formData.confirm_delete !== "DELETE MODULE") {
                return displayMessage(true, "Please type 'DELETE MODULE' to confirm");
            }

            setFormData(prev => ({ ...prev, isLoading: true }));

            const response = await api.delete(`/modules/${formData.module_id}`);

            displayMessage(false, response.data.message);
            setTimeout(() => {
                resetForm();
                setModalConfirmDelete(false);
                fetchModules();
            }, 2000);
        } catch (error: any) {
            displayErrorMessage(error);
        } finally {
            setFormData(prev => ({ ...prev, isLoading: false }));
        }
    };

    // RESTORE DISINI COK
    const handleRestoreModal = async (id: number | string) => {
        try {
            const response = await api.post(`/modules/search`, {
                type: "search_by_id",
                value: id
            });

            const { data } = response.data;
            console.log(data);
            formData.module_id = data.id;
            formData.title = data.title;
            formData.level = data.level as LevelType;
            setModalConfirmRestore(true);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || error?.response?.data?.data[0].message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    };

    const handleRestore = async (e: React.FormEvent<HTMLFormElement>, id: number | string) => {
        e.preventDefault();
        try {
            const response = await api.patch(`/modules/${id}`);
            const { message } = response.data;
            displayMessage(false, message);
            setTimeout(() => {
                setModalConfirmRestore(false);
                window.location.reload();
            }, 2000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || error?.response?.data?.data[0].message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    }

    // Helper functions
    const resetForm = () => {
        setFormData(INITIAL_FORM_DATA);
        setFormData(prev => ({ ...prev, isError: false, isLoading: false, message: "" }));
    };

    const handleSuccessAndReset = () => {
        setTimeout(() => {
            resetForm();
            setModalOpen(false);
            fetchModules();
        }, 2000);
    };

    const displayMessage = (isError: boolean, message: string) => {
        setFormData(prev => ({ ...prev, isError, isLoading: false, message }));

        if (message) {
            setTimeout(() => {
                setFormData(prev => ({ ...prev, isError: false, isLoading: false, message: "" }));
            }, 4000);
        }
    };

    const displayErrorMessage = (error: any) => {
        const errorMessage =
            error?.response?.data?.message ||
            error?.response?.data?.[0]?.message ||
            error?.response?.data?.data?.[0]?.message ||
            "An error occurred";

        displayMessage(true, errorMessage);
    };

    const navigateToModuleDetails = (moduleId: string | number) => {
        window.location.href = `/my-module/${moduleId}`;
    };

    // UI components
    const renderLevelBadge = (level: string) => {
        const badgeStyles = {
            beginner: "text-blue-600 bg-blue-100 hover:bg-blue-200",
            intermediate: "text-yellow-600 bg-yellow-100 hover:bg-yellow-200",
            advanced: "text-red-600 bg-red-100 hover:bg-red-200"
        };

        return (
            <span className={`text-sm font-semibold ${badgeStyles[level as keyof typeof badgeStyles]} px-3 py-1 rounded-full shadow-sm transition-colors duration-200`}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
        );
    };

    const renderStatusBadge = (isActive: boolean, type: 'published' | 'free') => {
        const activeStyles = "text-green-600 bg-green-100 hover:bg-green-200";
        const inactiveStyles = "text-red-600 bg-red-100 hover:bg-red-200";

        return (
            <span className={`text-sm font-semibold ${isActive ? activeStyles : inactiveStyles} px-3 py-1 rounded-full shadow-sm transition-colors duration-200`}>
                {type === 'published'
                    ? (isActive ? 'Published' : 'Unpublished')
                    : (isActive ? 'Free' : 'No')}
            </span>
        );
    };
    return (
        <>
            <div className="w-full flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                <TextField
                    type="search"
                    name="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    required={false}
                    disabled={false}
                    isLoading={false}
                    isError={false}
                />
                <Select
                    name="grouping"
                    value={grouping}
                    onChange={handleGroupingChange}
                    options={GROUP_OPTIONS.map(option => ({
                        ...option,
                        label: `${option.label} (${moduleStats[option.value as keyof typeof moduleStats]})`
                    }))}
                    disabled={false}
                    required={false}
                    isLoading={false}
                    isError={false}
                />
                <Button
                    name="New"
                    type="button"
                    onClick={() => handleOpenModal("create")}
                    className="border-black bg-black text-white hover:bg-gray-800 hover:text-white"
                    disabled={false}
                    isLoading={false}
                    fullWidth={false}
                />
            </div>
            <div className="w-full max-h-[80vh] overflow-auto rounded-sm flex flex-col gap-4 bg-white">
                <div className="w-full max-h-[40vh] overflow-auto">
                    {formData.isLoading && !modules.length ? (
                        <div className="text-center py-8">Loading modules...</div>
                    ) : modules.length === 0 ? (
                        <div className="text-center py-8">No modules found. Create your first module!</div>
                    ) : filteredModules.length === 0 ? (
                        <div className="text-center py-8">No modules match your search criteria.</div>
                    ) : (
                        <table className="w-full">
                            <thead className="w-full sticky top-0 bg-white">
                                <tr className="w-full capitalize border-y border-gray-300 bg-black text-white">
                                    <td className="w-[50px] p-2 text-center">No</td>
                                    <td className="min-w-[200px] p-2">Title</td>
                                    <td className="min-w-[100px] p-2 text-center">Level</td>
                                    <td className="min-w-[100px] p-2 text-center">Points Required</td>
                                    <td className="min-w-[100px] p-2 text-center">Status</td>
                                    <td className="min-w-[100px] p-2 text-center">Free Access</td>
                                    <td className="min-w-[100px] p-2 text-center">Status</td>
                                    <td className="min-w-[100px] p-2 text-center">Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredModules.map((module, index) => (
                                    <tr key={module.id} className={`w-full border-b border-gray-300 hover:bg-gray-100 ${module.is_deleted ? 'bg-gray-50' : ''}`}>
                                        <td className="w-[50px] p-2 text-center">{index + 1}</td>
                                        <td className="min-w-[200px] p-2 capitalize">{module.title}</td>
                                        <td className="min-w-[100px] p-2 text-center">
                                            {renderLevelBadge(module.level)}
                                        </td>
                                        <td className="min-w-[100px] p-2 text-center">{module.points_required}</td>
                                        <td className="min-w-[100px] p-2 text-center">
                                            {renderStatusBadge(module.is_published, 'published')}
                                        </td>
                                        <td className="min-w-[100px] p-2 text-center">
                                            {renderStatusBadge(module.is_free, 'free')}
                                        </td>
                                        <td className="w-fit p-2 text-center">
                                            {module.is_deleted ? (
                                                <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full shadow-sm hover:bg-red-200 transition-colors duration-200">
                                                    Deleted
                                                </span>
                                            ) : (
                                                <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full shadow-sm hover:bg-green-200 transition-colors duration-200">
                                                    Active
                                                </span>
                                            )}
                                        </td>
                                        <td className="min-w-[100px] p-2 text-center">
                                            <div className="w-full flex justify-center items-center gap-2">
                                                <IconButton
                                                    icon={<FaList className="w-4 h-4" />}
                                                    onClick={() => navigateToModuleDetails(module.id)}
                                                    className="text-gray-500 hover:text-gray-700 transition duration-200"
                                                    aria-label="View details"
                                                    type="button"
                                                />
                                                {module.is_deleted === false && (
                                                    <>
                                                        <IconButton
                                                            icon={<FaEdit className="w-4 h-4 text-orange-500" />}
                                                            onClick={() => handleOpenModal("edit", module.id)}
                                                            className="text-gray-500 hover:text-gray-700 transition duration-200"
                                                            aria-label="Edit module"
                                                            type="button"
                                                        />
                                                        <IconButton
                                                            icon={<FaUsers className="w-4 h-4 text-blue-500" />}
                                                            onClick={() => window.location.href = `/my-module/users/${module.id}`}
                                                            className="text-gray-500 hover:text-gray-700 transition duration-200"
                                                            aria-label="Edit module"
                                                            type="button"
                                                        />
                                                    </>
                                                )}
                                                {module.is_deleted === false && (
                                                    <IconButton
                                                        icon={<FaTrash className="w-4 h-4 text-red-500" />}
                                                        onClick={() => handleModalConfirmDelete(module.id)}
                                                        className={`${module.is_deleted ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'} transition duration-200`}
                                                        aria-label="Delete module"
                                                        type="button"
                                                    />
                                                )}
                                                {module.is_deleted === true && (
                                                    <IconButton
                                                        icon={<MdOutlineRestore className="w-4 h-4 text-green-500" />}
                                                        onClick={() => handleRestoreModal(module.id)}
                                                        aria-label="Restore module"
                                                        type="button"
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <Modal
                icon={<IoIosCreate className="w-6 h-6" />}
                isActive={modalOpen}
                title={formTitle === "create" ? "New" : "Edit"}
                closeModal={() => setModalOpen(false)}
                className="max-w-5xl"
            >
                <Form onSubmit={formTitle === "create" ? handleCreate : handleUpdate}>
                    {formData.message && (
                        <FormMessage message={formData.message ?? ""} isError={formData.isError ?? false} />
                    )}
                    {formTitle === "edit" && (
                        <FormItem>
                            <Label
                                htmlFor="module_id"
                                name="Module ID"
                                required
                            />
                            <TextField
                                type="text"
                                name="module_id"
                                value={String(formData.module_id)}
                                onChange={handleChange}
                                required={true}
                                disabled={true}
                                isLoading={formData.isLoading}
                                isError={formData.isError}
                            />
                        </FormItem>
                    )}
                    <FormItem>
                        <Label
                            htmlFor="title"
                            name="Title"
                            required
                        />
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
                            htmlFor="description"
                            name="Description"
                            required
                        />
                        <MarkdownEditor
                            dataColorMode={"light"}
                            mode={"edit"}
                            value={formData.description}
                            onChange={handleMarkdownChange}
                        />
                    </FormItem>
                    <FormItem>
                        <Label
                            htmlFor="level"
                            name="Level"
                            required
                        />
                        <Select
                            name="level"
                            options={LEVEL_OPTIONS}
                            value={formData.level}
                            onChange={handleChange}
                            disabled={formData.isLoading}
                            isLoading={formData.isLoading}
                            isError={formData.isError}
                            required={true}
                        />
                    </FormItem>
                    {formTitle === "edit" && (
                        <>
                            <FormSplit>
                                <FormItem>
                                    <Label
                                        htmlFor="visibility"
                                        name="Visibility"
                                        required
                                    />
                                    <Select
                                        name="is_published"
                                        options={PUBLISH_OPTIONS}
                                        value={String(formData.is_published)}
                                        onChange={handleChange}
                                        required={true}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        isError={formData.isError}
                                    />
                                </FormItem>
                                <FormItem>
                                    <Label
                                        htmlFor="is_free"
                                        name="Free"
                                        required
                                    />
                                    <Select
                                        name="is_free"
                                        options={BOOLEAN_OPTIONS}
                                        value={String(formData.is_free)}
                                        onChange={handleChange}
                                        required={true}
                                        disabled={formData.isLoading}
                                        isLoading={formData.isLoading}
                                        isError={formData.isError}
                                    />
                                </FormItem>
                            </FormSplit>
                        </>
                    )}
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
                icon={<FaTrash className="w-6 h-6" />}
                isActive={modalConfirmDelete}
                title="Confirm Delete"
                closeModal={() => setModalConfirmDelete(false)}
                className="max-w-lg"
            >
                <Form onSubmit={handleDelete}>
                    {formData.message && (
                        <FormMessage message={formData.message} isError={formData.isError} />
                    )}
                    <div>
                        <p className="text-sm font-medium text-gray-600">
                            Are you sure you want to delete this module?
                            Please type <span className="font-bold">DELETE MODULE</span> to confirm.
                        </p>
                    </div>
                    <FormItem>
                        <Label
                            htmlFor="confirm_datele"
                            name="Confirm Delete"
                            required
                        />
                        <TextField
                            type="text"
                            name="confirm_delete"
                            value={formData.confirm_delete}
                            onChange={handleChange}
                            required={true}
                            disabled={formData.isLoading}
                            isLoading={formData.isLoading}
                            isError={formData.isError}
                        />
                    </FormItem>
                    <Button
                        type="submit"
                        name={"Delete"}
                        disabled={formData.isLoading}
                        isLoading={formData.isLoading}
                        fullWidth={true}
                        className="border-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700"
                    />
                </Form>
            </Modal>

            {/* Restore Confirmation Modal */}
            <Modal
                icon={<MdOutlineRestore className="w-6 h-6" />}
                isActive={modalConfirmRestore}
                title="Restore Module"
                closeModal={() => setModalConfirmRestore(false)}
                className="max-w-lg"
            >
                <div className="mb-4 flex flex-col gap-4">
                    {formData.message && (
                        <FormMessage message={formData.message} isError={formData.isError} />
                    )}
                    <p className="text-sm font-medium text-gray-600">
                        Are you sure you want to restore this module :
                    </p>
                    <table className="w-full">
                        <tbody className="w-full">
                            <tr className="w-full">
                                <td className="border-y p-2">
                                    <span className="font-medium capitalize">ID</span>
                                </td>
                                <td className="border-y p-2">
                                    <span className="font-normal capitalize">{formData.module_id}</span>
                                </td>
                            </tr>
                            <tr className="w-full">
                                <td className="border-y p-2">
                                    <span className="font-medium capitalize">Title</span>
                                </td>
                                <td className="border-y p-2">
                                    <span className="font-normal capitalize">{formData.title}</span>
                                </td>
                            </tr>
                            <tr className="w-full">
                                <td className="border-y p-2">
                                    <span className="font-medium capitalize">Level</span>
                                </td>
                                <td className="border-y p-2">
                                    <span className="font-normal capitalize">{formData.level}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Button
                        type="button"
                        name={"Restore"}
                        onClick={(e: any) => handleRestore(e, formData.module_id)}
                        disabled={formData.isLoading}
                        isLoading={formData.isLoading}
                        fullWidth={true}
                        className="border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600"
                    />
                </div>
            </Modal>
        </>
    )
}