import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link , useNavigate} from "react-router-dom";
import axios from 'axios';

const SignIn= () => {
    const navigate = useNavigate();
    const [message, setMessage]=useState('')
    const [messageColor, setMessageColor]=useState('red')
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const messageStyle = {
        color: `${messageColor}`,  
      };
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/api/login', input)
        if(response.data.auth)
        {   
            setMessageColor('green')
            setMessage(response.data.message)
        }
        setMessage(response.data.message)

    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-6xl mx-auto">
                <form
                    action=""
                    onSubmit={submitHandler}
                    className="w-1/2 border border-gray-700 
          box-shadow: inset 0 2px 4px 0 rgb(0 0 0/ 0.05);
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
          rounded-md p-4 my-10"
                >
                    <h1 className="text-xl font-bold mb-5">Sign In</h1>
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
                        <Label>Password</Label>
                        <Input
                            type=""
                            placeholder="**********"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                        />
                    </div>
                    
                    <Button type="submit" className="w-full my-4">
                        Sign In
                    </Button>
                    <span className="text-sm">
                        Don't have an account?
                        <Link to="/signup" className="text-blue-600 pl-1 ">
                            Sign Up
                        </Link>
                    </span>
                    <p style={messageStyle}>{message}</p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
