import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { ShoppinCartContext } from "../../Context"
import { ShoppingCart } from "../ShoppingCart"
import Logo from "../../assets/logos/logo_yard_sale.svg"
import IconMenu from "../../assets/icons/icon_menu.svg"

const Navbar = () => {
  const context = useContext(ShoppinCartContext)
  const activeStyle = 'underline underline-offset-4'

  // Sign Out
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  const isUserSignOut = context.signOut || parsedSignOut
  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const handleSignout = () => {
    const stringifiedSignOut = JSON.stringify(true)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(true)
  }

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className="text-black/60 navbar-email">
            {parsedAccount?.email}
          </li>
          <li className="navbar-orders">
            <NavLink to='/my-orders' className={({ isActive }) => isActive ? activeStyle : undefined}>
              My orders
            </NavLink>
          </li>
          <li className="navbar-acount">
            <NavLink to='/my-acount' className={({ isActive }) => isActive ? activeStyle : undefined}>
              My Acount
            </NavLink>
          </li>
          <li className="navbar-sign-out ">
            <NavLink to='/sign-in' className={({ isActive }) => isActive ? activeStyle : undefined}
              onClick={() => handleSignout()}>
              Sign out
            </NavLink>
          </li>
        </>
      )
    } else {
      return (
        <li>
          <NavLink to='/sign-in' className={({ isActive }) => isActive ? activeStyle : undefined}
            onClick={() => handleSignout()}>
            Sign in
          </NavLink>
        </li>
      )
    }
  }
  return (
    <header className="w-full fixed top-0 z-10 text-md font-semibold text-slate-400 bg-white border border-b-2">
      <nav className='flex justify-between items-center gap-8 h-16 max-w-6xl lg:mx-auto mx-4'>
        <img src={IconMenu} alt="Icon menu" className="menu" />
        <img src={Logo} alt="Logo Yard Sale" className="logo" />
        <ul className="flex items-center gap-3 navbar-left">
          <li>
            <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
              <img src={Logo} alt="Logo Yard Sale" />
            </NavLink>
          </li>
          <li>
            <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}
              onClick={() => context.setSearchByCategory()}
              className={({ isActive }) => isActive ? activeStyle : undefined}
            >
              All
            </NavLink>
          </li>
          <li>
            <NavLink to='/clothes'
              onClick={() => context.setSearchByCategory('clothes')}
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              Clothes
            </NavLink>
          </li>
          <li>
            <NavLink to='/electronics'
              onClick={() => context.setSearchByCategory('electronics')}
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              Electronics
            </NavLink>
          </li>
          <li>
            <NavLink to='/furnitures'
              onClick={() => context.setSearchByCategory('furniture')}
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              Furnitures
            </NavLink>
          </li>
          <li>
            <NavLink to='/toys'
              onClick={() => context.setSearchByCategory('shoes')}
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink to='/others'
              onClick={() => context.setSearchByCategory('miscellaneous')}
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              Miscellaneous
            </NavLink>
          </li>
        </ul>
        <ul className="flex items-center gap-3">
          {renderView()}
          <li className="flex items-center">
            <ShoppingCart />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export { Navbar }