import { useCallback, useEffect } from 'react'
import {Link,useNavigate} from "react-router-dom"
import { Button } from '@/components/ui/button'
import { useLogOutUser } from '@/lib/react-query/useAuth'


const Topbar = () => {

  const {mutate: logout,isPending,isSuccess} = useLogOutUser();
  const navigate = useNavigate()

  useEffect(()=> {
    if (isSuccess) navigate(0)
  },[isSuccess])

  const onLogout = useCallback(()=> {
    logout();

  },[logout]);


  return (
    <header className="w-full border-b bg-white px-4 py-3 flex items-center justify-between z-20 w-100%" role="banner">
      <Link to="/" className="flex items-center gap-3">
        {/* use image natural sizes; keep width/height proportional */}
        <img
          src="/assets/images/logo.svg"
          alt="App logo"
          width={120}
          height={40}
          className="object-contain"
        />
      </Link>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="shad-button_ghost flex items-center gap-2"
          onClick={onLogout}
          disabled={isPending}
          aria-disabled={isPending}
        >
          <img src="/assets/icons/logout.svg" alt="" aria-hidden="true" />
          <span>Log out</span>
        </Button>

        {/* placeholder for profile / avatar */}
        {/* <Link to="/profile" aria-label="Profile"> ... </Link> */}
      </div>

    </header>
  )
}

export default Topbar
