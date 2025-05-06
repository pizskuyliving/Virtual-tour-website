import { Button } from "@/Components/ui/button";
import LogoUIR from "@/assets/logo-uir.png";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { Menu as MenuIcon } from "lucide-react";
import * as React from "react";
import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "./ui/navigation-menu";

export default function Navbar() {
    const [menuItems, setMenuItems] = React.useState([
        {
            name: "Teknik Informatika",
            href: "https://eng.uir.ac.id/teknik-informatika/", // Link baru
        },
        { name: "About", href: "/Organization" },
        { name: "Login", href: route("login") },
    ]);
    const { rooms } = usePage<PageProps<{ rooms: Room[] }>>().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        if (rooms && rooms.length > 0) {
            setMenuItems([
                {
                    name: "Teknik Informatika",
                    href: "https://eng.uir.ac.id/teknik-informatika/", // Link baru
                },
                { name: "About", href: "/Organization" },
                { name: "Login", href: route("login") },
            ]);
        }
    }, [rooms]);

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm text-white"
            style={{ backgroundColor: "#038A8D", color: "white !important" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <a
                            href="/"
                            className="text-2xl font-bold flex items-center gap-4"
                        >
                            <img
                                src={LogoUIR}
                                alt="Logo uir"
                                className="h-12"
                            />
                            <p> Virtual Tour 360 Teknik Informatika</p>
                        </a>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {menuItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative ml-3 group"
                            >
                                <a
                                    href={item.href}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium"
                                >
                                    {item.name}
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="sm:hidden flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Open menu"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            <MenuIcon className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {menuItems.map((item) => (
                            <div key={item.name}>
                                <a
                                    href={item.href}
                                    className="block px-3 py-2 text-base font-medium hover:bg-muted"
                                >
                                    {item.name}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
