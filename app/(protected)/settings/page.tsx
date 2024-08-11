import { auth, signOut } from "@/auth";

const Settings = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async (e) => {
          "use server";
          await signOut({
            redirectTo: "/auth/login",
          });
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </div>
  );
};

export default Settings;
