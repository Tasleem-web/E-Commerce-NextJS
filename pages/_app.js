import Layout from '../components/Layout'
import { DataContext, DataProvider } from '../store/GlobalState';
import '../styles/globals.css'
import '../styles/reset.css';

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  )
}

export default MyApp
