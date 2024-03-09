import { LoginButton } from '@telegram-auth/react'
import { getCsrfToken, signIn } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next/types'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context)
  const botUsername = process.env.BOT_USERNAME
  return {
    props: {
      csrfToken,
      botUsername,
    },
  }
}

const Signin = ({
  botUsername,
  csrfToken,
}: {
  botUsername: string
  csrfToken?: string
}) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
  )
}

export default Signin
