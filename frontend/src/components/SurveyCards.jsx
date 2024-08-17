import { Badge } from "./ui/badge"


const SurveyCards = () => {
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer ">
            <div>
                <h1 className="font-medium text-lg">Authority Name</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">Survey title</h1>
                <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing Lorem ipsum do dolor sit amet consectetur</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className={'text-blue-700 font-bold'} variant="ghost">Informative</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">Fun</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">24hr badge</Badge>
            </div>
        </div>
    )
}

export default SurveyCards;