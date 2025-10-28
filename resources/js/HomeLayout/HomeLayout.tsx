import { Fragment, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MeetTeam from "../Component/Frontend/home/MeetTeam";

interface MainLayoutProps {
  children: ReactNode;
}

function HomeLayout({ children }: MainLayoutProps) {
  return (
    <main>
      <Header />
      {children}
      <MeetTeam/>
      <Footer />
    </main>
  );
}

export default HomeLayout;
