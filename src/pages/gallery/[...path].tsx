import Head from 'next/head'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import siteConfig from '../../../config/site.config'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

import { useProtectedSWRInfinite } from '../../utils/fetchWithSWR'


export default function Folders() {
  const { pathname } = useRouter()

  console.info(`pathname in gallery view: ${pathname}`)
  
  const match = pathname.match(/\/gallery\/([^]+)/);


  const theFolderPath = match ? match[1] : undefined;
  
  console.info(`theFolderPath: ${theFolderPath}`)

  const { data, error } = useProtectedSWRInfinite(`/${theFolderPath}`)

  const responses: any[] = data ? [].concat(...data) : []

  console.info(`responses in gallery page: ${responses}`)


    

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Head>
        <title>{siteConfig.title}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col bg-gray-50 dark:bg-gray-800">
        <Navbar />
        <div className="mx-auto w-full max-w-5xl py-4 sm:p-4">
          {`theFolderPath: ${theFolderPath}`}
          {`This will be the gallery view`}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}