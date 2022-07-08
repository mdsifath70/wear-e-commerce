export default function Button({ children, as, className, ...res }) {
    const styles = `inline-flex gap-x-1 items-center text-white bg-indigo-500 py-2 px-4 hover:bg-indigo-600 rounded ${
        className ? className : ''
    }`;

    if (as === 'a')
        return (
            <span {...res} className={styles}>
                {children}
            </span>
        );

    return (
        <button {...res} className={`${styles} transition focus:ring-2 ring-offset-2 ring-indigo-500`}>
            {children}
        </button>
    );
}
