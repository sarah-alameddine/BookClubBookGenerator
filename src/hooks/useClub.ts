import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuth } from "@/hooks/useAuth";

export default function useClub() {
  const [clubName, setClubName] = useState("");
  const [clubId, setClubId] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchClub = async () => {
      setLoading(true);

      if (!user) {
        setClubName("");
        setClubId("");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setClubName("");
          setClubId("");
          return;
        }

        const userData = userSnap.data();
        const userClubId = userData?.clubId;

        if (!userClubId) {
          setClubName("");
          setClubId("");
          return;
        }

        setClubId(userClubId);

        const clubRef = doc(db, "clubs", userClubId);
        const clubSnap = await getDoc(clubRef);

        if (!clubSnap.exists()) {
          setClubName("");
          return;
        }

        const clubData = clubSnap.data();

        setClubName(clubData?.name || "");
      } catch (error) {
        console.error(error);
        setClubName("");
        setClubId("");
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, [user]);

  return { clubName, clubId, loading };
}
