import React, { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./Sections/Identity/Header";
import { ProfileCard } from "./Sections/Profile/ProfileCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { Action, PublicKey } from "./State/App.state";
import { Posts } from "./Sections/Posts/Posts";
import { ActionName, Actions } from "./Components/Actions";
import { HotFeed } from "./Sections/HotFeed/HotFeed";
function App() {
  const [selectedAction] = useRecoilState(Action);
  const publicKey = useRecoilValue(PublicKey);
  const [feed, setFeed] = useState<JSX.Element | null>(null);
  const displayFeed = () => {
    if (selectedAction === ActionName.HotFeed) {
      return <HotFeed publicKey={publicKey} />;
    }
    if (selectedAction === ActionName.MyPosts) {
      return <Posts publicKey={publicKey} />;
    }
    return <></>;
  };
  useEffect(() => {
    setFeed(displayFeed());
  }, [selectedAction]);

  return (
    <>
      <Header />
      <div className="flex justify-center">
        {publicKey && (
          <div>
            <ProfileCard publicKey={publicKey} />
            <Actions />
            <div className="flex justify-between w-full">
              <div className="flex-grow-0 max-w-[1200px]">
                {publicKey && feed}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
