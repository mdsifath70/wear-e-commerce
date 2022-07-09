export default function SectionCon({ children, className, conClassName }) {
    return (
        <section className={className}>
            <div className={`container container__space py-8 mx-auto ${conClassName || ''}`}>{children}</div>
        </section>
    );
}
