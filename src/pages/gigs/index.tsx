import { useEffect, useState } from "react";
import CreateGig from "../../components/gigs/create-gig";
import { useUserId } from "../../context/userIdContext";
import GigsService from "../../services/home/gigs";
import { GigData } from "../../types/gigs";

export default function Gigs() {
  const { userId } = useUserId();
  const [gigs, setGigs] = useState<GigData[] | undefined>(undefined);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await GigsService.getAllGigs();
        setGigs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (gigs === undefined) {
      fetchGigs();
    }
  }, [gigs]);
  console.log(gigs);
  return (
    <CreateGig user={userId} setGigs={setGigs}/>
  );
}
