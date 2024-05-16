import Signup from "./Signup"
import Signin from "./Signin"
import { useCallback, useState } from "react"

enum Routes {
    Signin = 'signin',
    Signup = 'signup',
}

export default function Login({ route }) {
    const [activeRoute, setActiveRoute] = useState<Routes>((route.params?.initialRoute as Routes) || Routes.Signup)

    const goTo = useCallback((route: string) => {
        setActiveRoute(route as Routes)
      }, [])

  return (
    <div>
        {activeRoute === Routes.Signin && <Signin goToSignUpPage={goTo} />}
        {activeRoute === Routes.Signup && <Signup goToSignInPage={goTo} />}
    </div>
  )
}
