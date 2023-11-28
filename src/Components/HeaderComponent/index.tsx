import useThemeStore from "../../store/themeStore";

const HeaderComponent = () => {
    const themes = useThemeStore.use.themes()
    const setTheme = useThemeStore.use.changeTheme()
  return(
      <div className="shadow-xl bg-base-400 navbar">
          <div className="navbar-start">
              <a className="btn btn-ghost text-xl">TodoList</a>
          </div>
          <div className="navbar-center">

          </div>
          <div className="navbar-end">
              <div className="flex-none">
                  <ul className="menu menu-horizontal px-1">
                      <li>
                          <details>
                              <summary>
                                  Themes
                              </summary>
                              <ul className="p-2 bg-base-100">
                                  {themes.map((item) => (
                                      <li key={item}><a onClick={() => setTheme(item)}>{item}</a></li>
                                  ))}
                              </ul>
                          </details>
                      </li>
                      <li></li>
                  </ul>
              </div>
          </div>
      </div>
  )
}

export default HeaderComponent