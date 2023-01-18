import Deso from "deso-protocol";
import { useRecoilValue } from "recoil";
import { PublicKey } from "../State/App.state";
import { useEffect, useState } from "react";
const deso = new Deso();

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const publicKey = useRecoilValue(PublicKey);
  useEffect(() => {
    getNotifications();
  });

  const getNotifications = async () => {
    const request = {
      NumToFetch: 50,
      PublicKeyBase58Check: publicKey,
      FetchStartIndex: 100,
    };

    const response = await deso.notifications.getNotifications(request);
    setNotifications(response);
    console.log(response);
  };

  return <div>?</div>;
}
