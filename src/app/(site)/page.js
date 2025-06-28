import { redirect } from "next/navigation";
import TestEvent from "@/layout/testevent";
const event = false;

export default function Home() {
  if (!event) {
    redirect("/home-page");
  }
  return <TestEvent />;
}
