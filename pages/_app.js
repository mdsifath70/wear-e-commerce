import NextNProgress from 'nextjs-progressbar';
import Layout from '../components/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <>
            <NextNProgress color="linear-gradient(to right, rgb(99 102 241), red)" />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
