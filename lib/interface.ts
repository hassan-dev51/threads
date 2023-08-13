export interface AccoutProfileProps {
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

export interface userInfoProps {
  username: string;
  name: string;
  bio: string;
  image: string;
}
