import getUser from "@/lib/getCurrentUser";
import UserInfo from "../_components/UserInfo";

const Page = async () => {
  const user = await getUser();
  return <UserInfo user={user} label="User Information" />;
};

export default Page;
