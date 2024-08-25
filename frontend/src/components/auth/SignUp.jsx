import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link , useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [message, setMessage]=useState('')
    const [messageColor, setMessageColor]=useState('red')
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
    });
    const messageStyle = {
        color: `${messageColor}`,  // Set the color you want here
      };
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    

    const submitHandler = async (e) => {
        e.preventDefault();
        // call backend api for signup
        const response = await axios.post('http://localhost:3000/api/register',input);
        setMessageColor(response.data.registered?'green':'red');
        setMessage(response.data.message)
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-6xl mx-auto">
                <form
                    onSubmit={submitHandler}
                    action=""
                    className="w-1/2 border border-gray-700 
          box-shadow: inset 0 2px 4px 0 rgb(0 0 0/ 0.05);
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
          rounded-md p-4 my-10"
                >
                    <h1 className="text-xl font-bold mb-5">Sign Up</h1>
                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            placeholder="ankit"
                            value={input.fullname}
                            name="fullName"
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="ankit@gmail.com"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className="my-2">
                        <Label>PhoneNumber</Label>
                        <Input
                            type="text"
                            placeholder="7667379951"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                        />
                    </div>
                    
                    <Button type="submit" className="w-full my-4">
                        SignUp
                    </Button>
                    <span className="text-sm">
                        Already have an account?
                        <Link to="/login" className="text-blue-600 pl-1 ">
                            Login
                        </Link>
                    </span>
                    <p style={messageStyle}>{message}</p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
