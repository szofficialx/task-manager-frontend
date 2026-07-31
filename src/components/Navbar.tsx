import { NavLink } from "react-router";

interface NavigationItem {
  label: string;
  path: string;
  end?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    path: "/",
    end: true,
  },
  {
    label: "Completed",
    path: "/completed"
  },
  {
    label: "Settings",
    path: "/settings",
  },
  {
    label: "About",
    path: "/about"
  },
];

function Navbar() {
  function getLinkClasses(isActive: boolean) {
    const baseClasses =
      "rounded-lg px-3 py-2 text-sm font-medium transition"
    
    if (isActive) {
      return `${baseClasses} bg-blue-600 text-white`;
    }

    return `${baseClasses} text-slate-600 hover:bg-slate-100 hover:text-slate-900`;
  }

  return (
    <nav className="mb-8 rounded-2x1 border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({isActive}) =>
              getLinkClasses(isActive)
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navbar;