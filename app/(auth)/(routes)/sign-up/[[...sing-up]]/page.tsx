"use client"
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  const router = useRouter();
  const { user } = useUser();

  
    // Check if the user is signed in and not in the loading state
    if (user) {
      router.push("/dashboard"); // Redirect to dashboard if the user is signed in
    }
 
  return <SignUp />;
}