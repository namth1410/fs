import * as React from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "../lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import {
  Camera,
  Cloud,
  CreditCard,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Moon,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Switch } from "../components/ui/switch";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

import { clearUser } from "../appdata/myselfSlice";
import { useAppDispatch } from "../appdata/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "iPad 15 series",
    href: "/product-list/iPad",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "iPad 14 series",
    href: "/product-list/iPad",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "iPad 13 series",
    href: "/product-list/iPad",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "iPad 12 series",
    href: "/product-list/iPad",
    description: "Visually or semantically separates content.",
  },
  {
    title: "iPad 11 series",
    href: "/product-list/iPad",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "iPad SE series",
    href: "/product-list/iPad",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const needLogin = !localStorage.getItem("token");

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.body.classList.add("dark");
    }
  }, []);

  const handleSwitchClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };
  return (
    <div className="flex justify-between py-2 px-10">
      <div className="flex items-center">
        <a href="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-8 w-auto object-contain min-w-[117px]"
          />
        </a>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Camera className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components that you can copy and
                        paste into your apps. Accessible. Customizable. Open
                        Source.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>iPad</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <a href="/product-list/watch">Watch</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Tìm kiếm..." />
        <Button type="submit">Tìm kiếm</Button>
      </div>

      {!needLogin && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard className="mr-2 h-4 w-4" />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Team</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>New Team</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Moon className="mr-2 h-4 w-4" />
              <span>Chế độ tối</span>
              <DropdownMenuShortcut>
                <div className="ml-auto">
                  {/* <Switch></Switch> */}
                  <Switch
                    checked={isDarkMode}
                    onClick={handleSwitchClick}
                    className={`${
                      isDarkMode ? "bg-blue-50" : "bg-gray-200"
                    } relative inline-flex items-center h-6 rounded-full w-11`}
                  >
                    <span
                      className={`${
                        isDarkMode ? "translate-x-6" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white rounded-full`}
                    />
                  </Switch>
                </div>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Cloud className="mr-2 h-4 w-4" />
              <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {needLogin && (
        <Button asChild variant="outline">
          <a href={`${process.env.REACT_APP_API_URL}/api/connect/google`}>
            <Mail className="mr-2 h-4 w-4" /> Đăng nhập bằng Google
          </a>
        </Button>
      )}
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
