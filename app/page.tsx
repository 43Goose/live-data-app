'use client';
import MessageSection from "@/components/MessageSection";
import InputSection from "../components/InputSection";
import AccountScreen from "@/components/AccountScreen";
import { useSession } from "next-auth/react";
import EditUser from "@/components/ui/EditUser";
import { useState } from "react";
import LOGO from "../public/Footprint.svg";
import Image from "next/image";

export default function Home() {
  const [showEdit, setShowEdit] = useState(false);
  const { data: session, status } = useSession();

  return (
    <main className="h-screen">
      <div className="hidden fixed top-4 left-4 w-24 h-24 z-50 md:block">
        <Image src={LOGO} alt="footprint logo" />
      </div>
      <div className="w-full">
        <MessageSection />
      </div>
      <InputSection openEditFn={() => setShowEdit(true)} />
      {status !== 'authenticated' && <AccountScreen />}
      {showEdit && <EditUser closeFn={() => setShowEdit(false)} />}
    </main>
  );
}