
import CategoryCarousel from "./CategoryCarousel"
import HeadSection from "./HeadSection"
import LatestSurvey from "./LatestSurvey"
import Navbar from "./shared/Navbar"


function Home() {
    return (
        <>
            <Navbar />
            <HeadSection/>
            <CategoryCarousel />
            <LatestSurvey/>
        </>
    )
}
export default Home