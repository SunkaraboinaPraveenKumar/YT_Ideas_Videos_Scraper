"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { SettingsModal } from "./SettingsModal";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  // const { isSignedIn } = useAuth();
  const {user}=useUser();

  return (
    <nav className="shadow-md mb-3 p-2 w-full">
      <div className="py-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-1">
            <Image src={'/logo.png'} alt="logo" height={50} width={50}/>
          </Link>
          {user?.primaryEmailAddress?.emailAddress && (
            <div className="flex items-center space-x-8 ml-auto mr-4 text-md">
              <Link
                href="/videos"
                className={cn(
                  "text-md",
                  pathname.startsWith("/videos")
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-primary hover:text-red-500 transition-all"
                )}
              >
                Videos
              </Link>
              <Link
                href="/ideas"
                className={cn(
                  "text-md",
                  pathname.startsWith("/ideas")
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-primary hover:text-red-500 transition-all"
                )}
              >
                Ideas
              </Link>
              <SettingsModal />
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </div>
          )}
          {!user?.primaryEmailAddress?.emailAddress && (
            <Link href="/videos">
              <Button className="font-semibold text-white bg-red-500 hover:bg-red-600">
                Get Started Now
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
