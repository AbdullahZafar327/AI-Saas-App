
import React from "react";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./MobileSidebar";
import { checkApiCount } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
  const apiLimitCount:number = await checkApiCount() || 0
  const isPro = await checkSubscription() || false
  
  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      <div className="flex justify-end w-full">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
