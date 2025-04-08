"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, XIcon } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";


function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <nav className="bg-primary flex justify-between items-center text-white py-4 px-8">
      <Link href="/" className="font-semibold">
        <Logo />
      </Link>

      
        <div className="hidden lg:flex gap-4">
          <Link href="/signup">
            <Button className="text-secondary border  border-secondary bg-primary">
              Create an account
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </div>

      <Button
        variant="secondary"
        className="lg:hidden"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu className="w-20 h-20" size={80} />
      </Button>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-[100dvw] h-[100dvh] z-50 bg-primary py-7 lg:hidden">
          <div className="container min-h-full flex flex-col items-center">

          <div className="flex items-center justify-end w-full pr-10">
              <button onClick={closeMenu}>
                <XIcon className="w-8 h-8 text-white" />
              </button>
            </div>

              <div className="mt-10 w-fit space-y-4">
                <Link href="/login" className="block">
                  <Button variant="secondary" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" className="block">
                  <Button className="text-secondary border w-full  border-secondary bg-primary">
                    Create an account
                  </Button>
                </Link>
              </div>
            
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
