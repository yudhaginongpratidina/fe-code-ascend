// client component
"use client";
// react or next
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from 'next/dynamic';
import api from "@/utils/api";
// icons
import { FaSwatchbook } from "react-icons/fa6";
// ui
// const MarkdownContentMaterial = dynamic(() => import('@/components/UI/MarkdownContentMaterial'), { ssr: false });
import MarkdownContent from "@/components/ui/MarkdownContent";
import { Form, FormItem, FormMessage } from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import { FaArrowRight, FaExclamationTriangle, FaLaptop, FaMobileAlt } from "react-icons/fa";
import MultipleChoiceQuestion from "@/components/ui/MultipleChoiceQuestion";
import Label from "@/components/ui/Label";

type FormDataType = {
    answer: string,
}
const initialFormData: FormDataType = {
    answer: "",
}
type DataChapter = {
    id: string | number
    title: string
    with_question: boolean
    content: string
    question: string
    answer_1: string
    answer_2: string
    answer_3: string
}
export default function Page() {
    const [isMobile, setIsMobile] = useState(false);
    const [liveEditorIsActive, setLiveEditorIsActive] = useState<boolean>(false);
    const [formData, setFormData] = useState(initialFormData);
    const [dataChapter, setDataChapter] = useState<DataChapter | null>(null);
    const [status, setStatus] = useState({ isError: false, isLoading: false, message: "" });
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [quizAttempted, setQuizAttempted] = useState<boolean>(false);
    const { moduleId, chapterId } = useParams();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const displayMessage = (isError: boolean, message: string) => {
        setStatus({ isError, isLoading: false, message });
        setTimeout(() => setStatus({ isError: false, isLoading: false, message: "" }), 4000);
    };
    const getChapterById = async () => {
        try {

            const checkDevice = () => {
                setIsMobile(window.innerWidth < 768);
                window.addEventListener('resize', checkDevice);
                return () => window.removeEventListener('resize', checkDevice);
            };

            // Cek saat komponen dimuat
            checkDevice();


            const response = await api.post("/chapters/search", {
                type: "search_by_id",
                value: chapterId
            })
            const { data, message } = response.data;
            displayMessage(false, message);
            // console.log(data);
            setDataChapter(data);
            if (data?.with_question) {
                const response = await api.post("/quiz-attempt/find", {
                    chapter_id: chapterId
                })
                const { data } = response.data;
                if (data.chapter_id === chapterId) {
                    setQuizAttempted(true);
                    displayMessage(false, "Quiz has already been attempted");
                }
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || error?.response?.data?.data[0]?.message;
            displayMessage(true, errorMessage);
        }
    }
    const checkingStatusCompleted = async () => {
        try {
            const response = await api.post("/chapter-progress/find-chapters", {
                module_id: moduleId,
            })
            const { data } = response.data;
            const isCompleted = data.some((chapter: any) => chapter.id === chapterId);
            setIsCompleted(isCompleted);
            if (isCompleted) {
                displayMessage(false, "Chapter has been completed");
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || error?.response?.data?.data[0]?.message || "An error occurred";
            console.error(errorMessage);
        }
    }
    const handleSubmitAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { answer } = formData;
            if (answer === "") {
                displayMessage(true, "Please fill in all fields");
                return;
            }
            const response = await api.post("/quiz-attempt", {
                module_id: moduleId,
                chapter_id: chapterId,
                answer
            })
            const { message } = response.data;
            displayMessage(false, message);
            setFormData(initialFormData);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    }
    const handleMarkAsCompleted = async () => {
        try {
            const response = await api.post("/chapter-progress/", {
                module_id: moduleId,
                chapter_id: chapterId
            })
            const { message } = response.data;
            displayMessage(false, message);
            setIsCompleted(true); // Update state after successful completion
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    }
    useEffect(() => {
        getChapterById();
        checkingStatusCompleted();
    }, []);
    return (
        <>
            <div className="w-full flex items-center justify-between">
                <div>
                    <h1 className="uppercase text-xl font-semibold">chapter</h1>
                    <p className="text-sm text-gray-600">Learning material</p>
                </div>
                <Button
                    type="button"
                    name={liveEditorIsActive ? "Close Live Editor" : "Open Live Editor"}
                    onClick={() => setLiveEditorIsActive(!liveEditorIsActive)}
                    disabled={false}
                    isLoading={false}
                    fullWidth={false}
                    className="border-black bg-black text-white hover:bg-gray-800 hover:text-white"
                />
            </div>

            <div className="w-full max-h-[80vh] overflow-auto flex flex-col gap-4 bg-white">
                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-sm bg-white">
                    <FaSwatchbook className="w-14 h-14 md:w-16 md:h-16 text-black transition-colors duration-200" />
                    <div className="flex flex-col gap-2">
                        <h1 className="text-lg md:text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-200">HTML Fundamentals</h1>
                        {isCompleted && (
                            <div className="w-fit text-xs font-semibold text-green-600 bg-green-100 px-4 py-1 rounded-md shadow-sm hover:bg-green-200 transition-all duration-200">
                                Completed
                            </div>
                        )}
                    </div>
                </div>
                {status.message && (
                    <FormMessage message={status.message} isError={status.isError} />
                )}
                <hr className="w-full border-gray-300" />
                <div className="w-full flex flex-col gap-4">
                    <h2 className="text-xl font-semibold uppercase">material</h2>
                    <MarkdownContent content={dataChapter?.content || ""} />
                </div>
                <hr className="w-full border-gray-300" />
                {liveEditorIsActive === true && (
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        {isMobile && (
                            <div className="w-full flex flex-col items-center md:flex-row md:items-start border rounded-sm border-yellow-100 bg-yellow-50 p-4">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 md:mb-0 md:mr-6">
                                    <FaExclamationTriangle size={24} />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                                        {isMobile ? "Anda menggunakan perangkat mobile!" : "Untuk pengalaman terbaik gunakan laptop atau PC"}
                                    </h3>
                                    <p className="mb-4 text-gray-600">
                                        Live editor berjalan lebih optimal pada perangkat dengan layar lebih besar. Gunakan laptop atau PC untuk memaksimalkan pengalaman coding Anda.
                                    </p>
                                    <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:items-start md:justify-start">
                                        <div className="flex items-center">
                                            <div className="mr-2 rounded-full bg-red-100 p-2 text-red-500">
                                                <FaMobileAlt size={20} />
                                            </div>
                                            <span className="text-red-600">Pengalaman terbatas</span>
                                        </div>
                                        <FaArrowRight className="hidden rotate-90 text-gray-400 md:block md:rotate-0" size={20} />
                                        <div className="flex items-center">
                                            <div className="mr-2 rounded-full bg-green-100 p-2 text-green-500">
                                                <FaLaptop size={20} />
                                            </div>
                                            <span className="text-green-600">Pengalaman optimal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <iframe
                            height="450px"
                            src="https://onecompiler.com/embed/html"
                            width="100%"
                        ></iframe>
                        <hr className="w-full border-gray-300" />
                    </div>
                )}
                {dataChapter?.with_question && (
                    <Form onSubmit={handleSubmitAnswer}>
                        <FormItem>
                            <Label htmlFor="question" name="Question" required={false} />
                            <MultipleChoiceQuestion
                                id="answer"
                                question={dataChapter?.question || ""}
                                value={formData.answer}
                                onChange={handleChange}
                                options={[
                                    { value: dataChapter?.answer_1 || "", label: `${dataChapter?.answer_1 || ""}` },
                                    { value: dataChapter?.answer_2 || "", label: `${dataChapter?.answer_2 || ""}` },
                                    { value: dataChapter?.answer_3 || "", label: `${dataChapter?.answer_3 || ""}` },
                                ]}
                            />
                            {quizAttempted === false && (
                                <Button
                                    type="submit"
                                    name={"Submit"}
                                    disabled={false}
                                    isLoading={false}
                                    fullWidth={true}
                                    className="border-black bg-black text-white hover:bg-gray-800 hover:text-white"
                                />
                            )}
                            {quizAttempted && (
                                <p className="text-blue-600 italic">You have already submitted answers for this quiz.</p>
                            )}
                        </FormItem>
                    </Form>
                )}
                <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-end gap-2">
                    {isCompleted === false && (
                        <Button
                            type="button"
                            name={"Mark as Completed"}
                            onClick={handleMarkAsCompleted}
                            disabled={false}
                            isLoading={false}
                            fullWidth={true}
                            className="border-black bg-black text-white hover:bg-gray-800 hover:text-white"
                        />
                    )}
                    <Button
                        type="button"
                        name={"Back"}
                        onClick={() => { window.history.back() }}
                        disabled={false}
                        isLoading={false}
                        fullWidth={true}
                        className="border-black bg-black text-white hover:bg-gray-800 hover:text-white"
                    />
                </div>
            </div>
        </>
    )
}