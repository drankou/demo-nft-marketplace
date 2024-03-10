import { LoginButton } from '@telegram-auth/react'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next/types'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const botUsername = process.env.BOT_USERNAME
  return {
    props: {
      botUsername,
    },
  }
}

const Signin = ({ botUsername }: { botUsername: string }) => {
  const router = useRouter()

  const { error } = router.query

  return (
    <>
      <Head>
        <title>💎 Marketplace - Log In </title>
      </Head>
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2">
        <span className="text-4xl font-semibold">💎&nbsp;Marketplace</span>
      </div>
      <div className="flex h-screen flex-col items-center justify-center">
        {error && (
          <p className="p-4 text-red-500">
            Oops! Something went wrong 😕 Try again.
          </p>
        )}
        <LoginButton
          botUsername={botUsername}
          requestAccess={null}
          showAvatar={false}
          widgetVersion={22}
          onAuthCallback={(data) => {
            signIn('telegram', { callbackUrl: '/' }, data as any)
          }}
        />
      </div>
    </>
  )
}

export default Signin
