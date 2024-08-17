

import { Search } from "lucide-react"
import { Button } from "./ui/button"


const HeadSection = () => {
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>{"World's  1st  Website  for  Surveys"}</span>
                <h1 className="text-5xl font-bold">Search,Post & <br />Get Your <span className="text-[#6A38C2]">Dream Results</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit itaque maxime, ab corporis repudiandae similique ratione </p>
                <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto ">
                    <input
                        className="w-full outline-none border-none"
                        type="text"
                        placeholder="A ton of surveys ahead"
                    />
                    <Button className="rounded-r-full bg-[#6A38C2]">
                        <Search className="h-5 w-5" />
                    </Button>

                </div>
            </div>
        </div>
    )
}

export default HeadSection