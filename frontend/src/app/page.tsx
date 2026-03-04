import { Button } from "@/components/ui/button";
import { ArrowRightIcon, BookIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-100">

      <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-xl shadow-black/40">
        <BookIcon className="w-10 h-10 text-zinc-400" />
      </div>

      <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Todos gue</h1>

      <Link href="/todos" className="mt-8">
        <Button className="cursor-pointer flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white transition-colors">
          Lihat Todo
          <ArrowRightIcon/>
        </Button>
      </Link>

    </div>
  );
}