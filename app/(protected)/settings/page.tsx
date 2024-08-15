import { Card, CardContent, CardHeader } from "@/components/ui/card";
import getUser from "@/lib/getCurrentUser";
import { ExtendedUser } from "@/next-auth";
import SettingsForm from "../_components/SettingsForm";

const Settings = async () => {
  const user: ExtendedUser | undefined = await getUser();
  return (
    <Card className="w-[600px] rounded-xl border-2 border-slate-800  shadow-2xl">
      <CardHeader>
        <p className="gradient-header text-center">Settings</p>
      </CardHeader>
      <CardContent>
        <SettingsForm user={user} />
      </CardContent>
    </Card>
  );
};

export default Settings;
