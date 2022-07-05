import Link from 'next/link';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Forgot() {
    return (
        <section>
            <div className="container container__space py-8 mx-auto">
                <h1 className="text-2xl font-medium text-center mb-6">Login</h1>
                <form className="max-w-xl mx-auto space-y-4">
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
                    <div className="flex items-center justify-between">
                        <Button type="submit" className="text-sm">
                            Forgot
                        </Button>
                        <Link href="/login">
                            <a className="text-indigo-600 hover:underline hover:underline-offset-4">
                                Already have an account?
                            </a>
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
