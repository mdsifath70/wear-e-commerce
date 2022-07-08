import { getCookie, hasCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';
import Input from '../components/Input';
import { useUserContext } from '../contexts/UserContext';

export default function Login() {
    const { setUser } = useUserContext();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });
    const router = useRouter();

    // Redirect if login
    useEffect(() => {
        if (hasCookie('bearer_token')) {
            router.push('/');
        }
    }, [router]);

    const inputOnchangeHandler = (e) => {
        setUserInfo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // destructure userInfo
    const { email, password } = userInfo;

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (email && password) {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applications/json',
                },
                body: JSON.stringify(userInfo),
            });
            const { message, token, error } = await res.json();
            if (message) {
                setTimeout(() => {
                    toast.success(message);
                }, 10);
                router.push('/');
                // Set cookie
                setCookie('bearer_token', 'bearer ' + token, {
                    maxAge: Number(process.env.NEXT_PUBLIC_JWT_COOKIE_EXPIRE),
                    secure: true,
                });
                if (hasCookie('bearer_token')) {
                    setUser({
                        value: getCookie('bearer_token'),
                    });
                }
                setUserInfo({
                    email: '',
                    password: '',
                });
            }
            if (error) toast.error(error);
        } else {
            toast.error('You should fill all field!');
        }
    };

    return (
        <section>
            <div className="container container__space py-8 mx-auto">
                <h1 className="text-2xl font-medium text-center mb-6">Login</h1>
                <form onSubmit={onSubmitHandler} className="max-w-xl mx-auto space-y-4">
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
                            Login
                        </Button>
                        <Link href="/forgot">
                            <a className="text-indigo-600 hover:underline hover:underline-offset-4">
                                Forgot your password?
                            </a>
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link href="/signup">
                            <a className="text-indigo-600 hover:underline hover:underline-offset-4">
                                Not have an account? Sign up
                            </a>
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
