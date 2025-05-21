export default function FrequentlyAskedQuestions() {
    return (
        <section className="w-full py-20 px-4 md:px-6 bg-white">
            <div className="container mx-auto flex flex-col items-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
                <div className="w-20 h-1 bg-blue-600 mb-10 rounded-full"></div>
                <div className="w-full space-y-6 max-w-3xl">
                    <FAQ
                        qustion="What is a gamified programming learning platform?"
                        answer="It is an interactive platform for learning coding that incorporates game elements such as experience, points, levels, and challenges to make learning more fun and motivating."
                    />
                    <FAQ
                        qustion="Is the platform free?"
                        answer="Yes! You can start learning for free. There are also optional premium features for a more complete experience, such as exclusive content, certificates and access to mentors."
                    />
                    <FAQ
                        qustion="Do you need additional installation or software?"
                        answer="No need. You can simply write and run code through your browser using our responsive and user-friendly built-in editor."
                    />
                    <FAQ
                        qustion="How does the EXP and points system work?"
                        answer="You'll earn experience and points every time you complete challenges, quizzes, or contribute to the community. The more experience, the higher your level and badge!"
                    />
                    <FAQ
                        qustion="Can I track my learning progress?"
                        answer="Of course. Our platform is equipped with a tracking feature that displays learning progress, skill levels, and topics mastered in the form of attractive graphics."
                    />
                    <FAQ
                        qustion="Is this platform suitable for beginners?"
                        answer=" Sangat cocok! Kami menyediakan jalur pembelajaran dari dasar hingga mahir, dengan penjelasan yang mudah dipahami, serta komunitas aktif yang siap membantu."
                    />
                </div>
            </div>
        </section>
    )
}

const FAQ = ({ qustion, answer }: Readonly<{ qustion: string, answer: string }>) => {
    return (
        <div className="border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{qustion}</h3>
            <p className="text-gray-600">
                {answer}
            </p>
        </div>
    )
}
