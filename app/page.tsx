// import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/user-nav";

export default function Home() {
  return (
    <main className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome back mr. Kopplin!
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your challenges!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>

      <div>content</div>
    </main>
  );
}
