import { useEffect } from "react";
import { getBuildingDetail } from "../supabase/supabase.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

export function useBuildingDetail(buildingId) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["building", buildingId],
    queryFn: () => getBuildingDetail(buildingId),
  });

  useEffect(() => {
    if (!buildingId) return;

    const channel = supabase
      .channel(`building-${buildingId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "buildings", filter: `id=eq.${buildingId}` },
        (payload) => {
          queryClient.setQueryData(["building", buildingId], (oldData) => {
            if (!oldData) return oldData;

            switch (payload.eventType) {
              case "INSERT":
              case "UPDATE":
                return { ...oldData, ...payload.new };
              case "DELETE":
                // Optional: remove building from cache
                return undefined; // Query will now show no data
              default:
                return oldData;
            }
          });
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [buildingId, queryClient]);

  return query;
}
