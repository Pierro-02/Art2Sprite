'use client';

import { Menu, Search, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png"; // Make sure this path is correct
import { useState } from "react";

export function Header() {
  

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-col items-center border-b border-gray-300"> {/* Flex Column */}
        {/* Top Row: Logo, Subscribe, Sign In, Search */}
        <div className="w-full flex items-center justify-between mb-2"> {/* mb-2 for spacing */}
          <Link href="/" className="flex items-center">
            <Image src={Logo} width={80} height={52} alt="A2S Logo" priority/>
          </Link>

          <div className="flex items-center space-x-4">
           <Link href="/Work">
            <button className="bg-black text-white text-sm font-semibold py-2 px-4 rounded">
              Home
            </button>
            </Link>
            <Link href="/Signup" className="text-gray-700 hover:text-themeblue flex items-center">
              <User className="h-4 w-4 mr-1"/>
               Sign In
            </Link>
            <button className="text-gray-700 hover:text-themeblue">
              <Search className="h-5 w-5"/>
            </button>
          </div>
        </div>


      </div>
    </header>
  );
}