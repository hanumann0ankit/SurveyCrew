import SurveyCards from "./SurveyCards";

const randomNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestSurvey = () => {
    return (
        <div className="max-w-7xl mx-auto my-20">
            <h1 className="text-4xl font-bold"><span className="text-[#6A38C2]">Trending </span>Surveys </h1>
            <div className="grid grid-cols-3 gap-4 my-5">
                {
                    randomNumbers.slice(0, 6).map((item, index) => <SurveyCards/>)
                }
            </div>

        </div>
    )
}

export default LatestSurvey;