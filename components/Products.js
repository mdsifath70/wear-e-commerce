import SectionCon from './SectionCon';

export default function Products({ children }) {
    return (
        <SectionCon className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{children}</div>
        </SectionCon>
    );
}
