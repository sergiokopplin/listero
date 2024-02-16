import { auth } from "@/auth";
import { SignIn } from "@/components/auth-components";
import { ModeToggle } from "@/components/mode-toggle";
import UserButton from "@/components/user-button";

export default async function Home() {
  const session = await auth();

  return (
    <main className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {!session?.user ? (
        <SignIn />
      ) : (
        <>
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
              <ModeToggle />
              <UserButton />
            </div>
          </div>

          <div>content</div>
        </>
      )}
    </main>
  );
}
