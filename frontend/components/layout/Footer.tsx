//import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Logo from "@/assets/logonname.png";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-themedarkblue text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
          <Link href="/" className="font-semibold text-xl">
            <Image src={Logo} width={250} height={250} alt="A2S Logo"/>
          </Link>
          </div>
          <div>
            <h3 className="font-bold mb-4">Made By:</h3>
            <ul className="space-y-2">
              <li><a href="https://www.linkedin.com/in/attique20/" target="_blank" className="text-gray-400 hover:text-white">Mohammad Attique</a></li>
              <li><a href="https://www.linkedin.com/in/mtaim/" target="_blank" className="text-gray-400 hover:text-white">Taimur Aamir</a></li>
              <li><a href="https://www.linkedin.com/in/rayyanzia/" target="_blank" className="text-gray-400 hover:text-white">Rayyan Zia</a></li>
            </ul>
            <br />
            <h3 className="font-bold mb-4">Supervised By:</h3>
            <ul className="space-y-2">
                <li className="text-gray-400 hover:text-white">Ms. Mariam Hida</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Pages:</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-white">About</li>
              <li className="text-gray-400 hover:text-white">
                <a href="/process">Design Process</a>
              </li>
              <li className="text-gray-400 hover:text-white">Credits</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Links:</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-white">GitHub</li>
              <li className="text-gray-400 hover:text-white">Kaggle</li>
              <li className="text-gray-400 hover:text-white">Hugging Face</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Art2Sprite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/*
<h3 className="font-bold text-xl mb-4">
              CompanyName
            </h3>
            <p className="text-gray-400 mb-4">
              Building the future of digital experiences, one pixel at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-gray-300"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-gray-300"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-gray-300"><Linkedin className="h-5 w-5" /></a>
            </div>
*/