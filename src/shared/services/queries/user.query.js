
import { fetchCurrentUserData } from "@/lib/firebase/auth";
import { auth } from "@/lib/firebase/config";

import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUserData,
    enabled: !!auth.currentUser, // Only run if user is logged in
    staleTime: 1000 * 60 * 5, // Optional: cache for 5 mins
  });
};

export default useCurrentUser;
