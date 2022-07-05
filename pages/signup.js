import Link from 'next/link';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Signup() {
    return (
        <section>
            <div className="container container__space py-8 mx-auto">
                <h1 className="text-2xl font-medium text-center mb-6">
                    Signup
                </h1>
                <form className="max-w-xl mx-auto space-y-4">
                    <div>
                        <label className="flex-grow space-y-2">
                            <span className="after:content-['*'] after:ml-1 after:text-red-500">
                                Name
                            </span>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="flex-grow space-y-2">
                            <span className="after:content-['*'] after:ml-1 after:text-red-500">
                                Email
                            </span>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="flex-grow space-y-2">
                            <span className="after:content-['*'] after:ml-1 after:text-red-500">
                                Password
                            </span>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
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
            </div>
        </section>
    );
}
