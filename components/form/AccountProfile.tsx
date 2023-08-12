"use client";

interface AccoutProfileProps {
  userData: {
    id: string | undefined;
    objectId: string | null | undefined;
    username: string | null | undefined;
    name: string | null | undefined;
    bio: string;
    image: string | undefined;
  };
  btnText: string;
}
const AccoutProfile = ({ userData, btnText }: AccoutProfileProps) => {
  return <div>Accout profile</div>;
};
export default AccoutProfile;
