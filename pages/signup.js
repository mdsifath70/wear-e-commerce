import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import SectionCon from '../components/SectionCon';

export default function Signup() {
    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
    });

    const inputOnchangeHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // destructure user
    const { userName, email, password } = user;

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (userName && email && password) {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applications/json',
                },
                body: JSON.stringify(user),
            });
            const { message, token, error } = await res.json();
            if (message) {
                toast.success(message);
                setCookie('bearer_token', 'bearer ' + token, {
                    maxAge: Number(process.env.NEXT_PUBLIC_JWT_COOKIE_EXPIRE),
                    secure: true,
                });
            }
            if (error) toast.error(error);
        } else {
            toast.error('You should fill all field!');
            setUser({
                email: '',
                password: '',
            });
        }
    };

    return (
        <SectionCon>
            <h1 className="text-2xl font-medium text-center mb-6">Signup</h1>
            <form onSubmit={onSubmitHandler} className="max-w-xl mx-auto space-y-4">
                <div>
                    <label className="flex-grow space-y-2">
                        <span className="after:content-['*'] after:ml-1 after:text-red-500">Name</span>
                        <Input
                            type="text"
                            name="userName"
                            placeholder="Enter your name"
                            value={userName}
                            onChange={inputOnchangeHandler}
                        />
                    </label>
                </div>
                <div>
                    <label className="flex-grow space-y-2">
                        <span className="after:content-['*'] after:ml-1 after:text-red-500">Email</span>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={inputOnchangeHandler}
                        />
                    </label>
                </div>
                <div>
                    <label className="flex-grow space-y-2">
                        <span className="after:content-['*'] after:ml-1 after:text-red-500">Password</span>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={inputOnchangeHandler}
                        />
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <Button type="submit" className="text-sm">
                        Sign up
                    </Button>
                    <Link href="/login">
                        <a className="text-indigo-600 hover:underline hover:underline-offset-4">
                            Not have an account? Login
                        </a>
                    </Link>
                </div>
            </form>
        </SectionCon>
    );
}
