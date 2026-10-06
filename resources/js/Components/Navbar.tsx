import { Button } from "@/Components/ui/button";
import LogoUIR from "@/assets/logo-uir.png";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types/index";
import { usePage } from "@inertiajs/react";
// You might not need these from @radix-ui/react-navigation-menu if not using advanced Radix UI components
// For a simple navbar, a basic `div` structure is often enough.
// import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react"; // Import X icon for close button
import * as React from "react";
// Remove these if you're not using Radix UI NavigationMenu components explicitly in the render
// import {
//     NavigationMenuContent,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger,
// } from "./ui/navigation-menu";

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
        // This useEffect seems to reset menuItems to the initial state regardless of 'rooms' content.
        // If 'rooms' are meant to add dynamic menu items, you'd need to modify this logic.
        // For now, it keeps the menu items static as defined initially.
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

    // Function to close mobile menu
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 shadow-sm text-white"
            style={{ backgroundColor: "#038A8D" }} // Inline style for background color
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {" "}
                    {/* Added items-center for vertical alignment */}
                    <div className="flex-shrink-0 flex items-center">
                        <a
                            href="/"
                            className="text-xl md:text-2xl font-bold flex items-center gap-2 md:gap-4" // Adjusted text size and gap for mobile
                        >
                            <img
                                src={LogoUIR}
                                alt="Logo uir"
                                className="h-10 md:h-12" // Adjusted logo height for mobile
                            />
                            {/* Shorten title for mobile or wrap it gracefully */}
                            <p className="hidden sm:block">
                                Virtual Tour 360 Prodi Teknik Informatika
                            </p>
                            <p className="block sm:hidden text-base leading-tight">
                                Virtual Tour 360 <br /> Prodi Teknik Informatika
                            </p>{" "}
                            {/* Shorter title for small screens */}
                        </a>
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {menuItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative ml-3 group"
                            >
                                <a
                                    href={item.href}
                                    // Use 'text-white' directly on the link as the parent nav is already #038A8D
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-white hover:bg-opacity-20 rounded-md transition-colors duration-200"
                                >
                                    {item.name}
                                </a>
                            </div>
                        ))}
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="sm:hidden flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={
                                isMobileMenuOpen ? "Close menu" : "Open menu"
                            }
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="text-white hover:bg-white hover:bg-opacity-20" // Ensure button looks good
                        >
                            {isMobileMenuOpen ? (
                                <CloseIcon className="h-6 w-6" />
                            ) : (
                                <MenuIcon className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className="sm:hidden bg-[#038A8D] py-2 shadow-lg">
                    {" "}
                    {/* Added py-2 and shadow-lg */}
                    <div className="pt-2 pb-3 px-4 space-y-1">
                        {" "}
                        {/* Added px-4 for padding */}
                        {menuItems.map((item) => (
                            <div key={item.name}>
                                <a
                                    href={item.href}
                                    onClick={closeMobileMenu} // Close menu on item click
                                    className="block px-3 py-2 text-base font-medium text-white hover:bg-white hover:bg-opacity-20 rounded-md transition-colors duration-200"
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
