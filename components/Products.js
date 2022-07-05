export default function Products({ children }) {
    return (
        <section className="text-gray-700 max-w-7xl mx-auto">
            <div className="container container__space py-10 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {children}
                </div>
            </div>
        </section>
    );
}
