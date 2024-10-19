import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Audio",
    href: "/audio",
  },
  // {
  //   name: "Log",
  //   href: "/log",
  // },
];

export default function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          {navigation.map((nav, i) => (
            <NavigationMenuItem key={i}>
              <Link href={nav.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {nav.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
        <ModeToggle />
      </NavigationMenu>
    </div>
  );
}
