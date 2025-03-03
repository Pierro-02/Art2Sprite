'use client';

import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";

/*import { Button } from "@/components/ui/button";
<Button variant="default">Get Started</Button>
<Button variant="ghost" size="icon" className="md:hidden">
<Menu className="h-6 w-6" />
<Link href="#" className="text-gray-600 hover:text-gray-900">Home</Link>
</Button>*/

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl">
          <Image src={Logo} width={80} height={52} alt="A2S Logo"/>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-themeblue hover:text-themedarkblue"><Menu className="h-7 w-7" /></Link>
        </nav>
      </div>
    </header>
  );
}