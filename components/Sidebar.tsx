"use client"
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LayoutDashboard ,MessageSquare , ImageIcon , VideoIcon , Music ,Code , Settings } from "lucide-react";
import { usePathname} from 'next/navigation'
import FreeCount from "./FreeCount";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    href: "/image",
    icon: ImageIcon,
    color: "text-pink-700",
  },

  {
    label: "Code Generation",
    href: "/code",
    icon: Code,
    color: "text-green-700",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
   
  },
];

export interface apiCountProps {
  apiLimitCount : number,
  isPro:boolean
}
const Sidebar = ({apiLimitCount = 0 , isPro = false }:apiCountProps) => {
    const pathname =  usePathname()
  return (
    <div className="flex flex-col space-y-4 py-4 bg-[#111827] text-white h-full">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className=" relative h-8 w-8 mr-4">
            <Image src="/logo.png" alt="logo" fill />
          </div>
          <h1 className={cn("font-bold text-2xl", montserrat.className)}>
            AI GENIUS
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link href={route.href} key={route.href} className={cn("text-sm group p-3 w-full rounded-lg font-medium flex justify-start hover:text-white hover:bg-white/10 cursor-pointer transition",pathname === route.href? "bg-white/10 text-white": "text-zinc-400")}>
              <div className="flex items-center flex-1">
                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />

                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCount apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
};

export default Sidebar;
