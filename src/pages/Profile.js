
import { ProfileCard } from "../Sections/Profile/ProfileCard";
import { useRecoilValue } from "recoil";
import { PublicKey } from "../State/App.state";
import { Posts } from "../Sections/Posts/Posts";

export default function Profile() {
  const publicKey = useRecoilValue(PublicKey);
  return (
    <>
      <div>
        <ProfileCard />
      </div>

      <div>
        <Posts publicKey={publicKey} />
      </div>
    </>
  );
}
