import JumbotronHome from "@/components/features/home/JumbotronHome"
import FeatureHome from "@/components/features/home/FeatureHome"
import FrequentlyAskedQuestions from "@/components/features/home/FrequentlyAskedQuestions"

export default function Page() {
    return (
        <>
            <JumbotronHome />
            <FeatureHome />
            <FrequentlyAskedQuestions />
        </>
    )
}