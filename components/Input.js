export default function Input({ as, className, ...res }) {
    const styles = `px-3 py-2 shadow-sm border border-slate-400 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 block w-full rounded-md sm:text-sm focus:ring-1 ${
        className ? className : ''
    }`;

    if (as === 'textarea')
        return <textarea {...res} className={styles}></textarea>;

    return <input {...res} className={styles} />;
}
