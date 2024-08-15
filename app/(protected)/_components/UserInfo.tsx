import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExtendedUser } from "@/next-auth";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] rounded-xl border-2 border-slate-800  shadow-2xl">
      <CardHeader>
        <p className="gradient-header text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="max-w-[180px] truncate  rounded-md bg-slate-800 p-1 font-mono text-sm">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="max-w-[180px] truncate  rounded-md bg-slate-800 p-1 font-mono text-sm">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="max-w-[180px] truncate  rounded-md bg-slate-800 p-1 font-mono text-sm">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="max-w-[180px] truncate  rounded-md bg-slate-800 p-1 font-mono text-sm">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">2FA</p>
          {/* <p className="max-w-[180px] truncate  rounded-md bg-slate-800 p-1 font-mono text-sm"> */}
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
          {/* </p> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
