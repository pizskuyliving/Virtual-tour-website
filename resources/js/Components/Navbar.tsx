import { Button } from "@/Components/ui/button";
import LogoUIR from "@/assets/logo-uir.png";
import { PageProps } from "@/types/index";
import { usePage } from "@inertiajs/react";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import * as React from "react";

export default function Navbar() {
    const user = usePage<PageProps>().props.auth?.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    // Logged-in admins go straight to the dashboard instead of seeing "Login"
    const menuItems = [
        {
            name: "Teknik Informatika",
            href: "https://eng.uir.ac.id/teknik-informatika/",
        },
        { name: "About", href: "/Organization" },
        user?.is_admin
            ? { name: "Dashboard", href: route("dashboard") }
            : { name: "Login", href: route("login") },
    ];

    // Function to close mobile menu
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 shadow-sm text-white"
            style={{ backgroundColor: "#038A8D" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <a
                            href="/"
                            className="text-xl md:text-2xl font-bold flex items-center gap-2 md:gap-4"
                        >
                            <img
                                src={LogoUIR}
                                alt="Logo uir"
                                className="h-10 md:h-12"
                            />
                            <p className="hidden sm:block">
                                Virtual Tour 360 Prodi Teknik Informatika
                            </p>
                            <p className="block sm:hidden text-base leading-tight">
                                Virtual Tour 360 <br /> Prodi Teknik Informatika
                            </p>
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
                            className="text-white hover:bg-white hover:bg-opacity-20"
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
                    <div className="pt-2 pb-3 px-4 space-y-1">
                        {menuItems.map((item) => (
                            <div key={item.name}>
                                <a
                                    href={item.href}
                                    onClick={closeMobileMenu}
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
