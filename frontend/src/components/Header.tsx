import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  Navbar,
} from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearUser } from "../appdata/myselfSlice";
import { useAppDispatch } from "../appdata/store";

export const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const needLogin = !localStorage.getItem("token");

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img
          src="/favicon.ico"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite
        </span>
      </Navbar.Brand>

      <Navbar.Collapse>
        <Navbar.Link href="/" active={location.pathname === "/home"}>
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/product-list/iPhone"
          active={location.pathname === "/product-list/iPhone"}
        >
          iPhone
        </Navbar.Link>
        <Navbar.Link
          href="/product-list/iPad"
          active={location.pathname === "/product-list/iPad"}
        >
          iPad
        </Navbar.Link>
        <Navbar.Link
          href="/product-list/Mac"
          active={location.pathname === "/product-list/Mac"}
        >
          Mac
        </Navbar.Link>
        <Navbar.Link
          href="/product-list/Watch"
          active={location.pathname === "/product-list/Watch"}
        >
          Watch
        </Navbar.Link>
      </Navbar.Collapse>

      {/* <Button className="rounded-full h-10 w-10 flex justify-center items-center">
        <Moon className="h-6 w-6" />
      </Button> */}

      <div className="flex items-center space-x-4">
        <DarkThemeToggle className="focus:ring-0 rounded-full bg-neutral-300 dark:border-l-indigo-100" />

        {/* <Button
          className="rounded-full h-10 w-10 flex justify-center items-center focus:ring-0"
          onClick={handleSwitchClick}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </Button> */}

        {needLogin && (
          <Button>
            <a href={`${process.env.REACT_APP_API_URL}/api/connect/google`}>
              Đăng nhập bằng Google
            </a>
          </Button>
        )}

        {!needLogin && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};
