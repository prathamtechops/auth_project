import FormMessage from "@/components/form/FormMessage";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import AdminButton from "../_components/AdminButton";
import RoleGate from "../_components/RoleGate";

const AdminPage = () => {
  return (
    <Card className="w-[600px] rounded-xl border-2 border-slate-800  shadow-2xl">
      <CardHeader>
        <p className="gradient-header text-center">Admin</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormMessage
            message="You are allowed to access this page"
            type="success"
          />
        </RoleGate>
        <div className="flex  items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin Only Server Action</p>
          <AdminButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
