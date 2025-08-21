import { supabase } from "@/lib/supabase/client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getAllBuildings } from "../supabase/supabase.api";


export function useBuildingsWithRealtime() {
    const queryClient = useQueryClient();
    const query = useQuery({ queryKey: ["buildings"], queryFn: getAllBuildings });

    useEffect(() => {
          if (!queryClient) return;
        // buildings
        const buildingsChannel = supabase
            .channel("buildings-realtime")
            .on("postgres_changes", { event: "*", schema: "public", table: "buildings" }, (payload) => {
             console.log("📡 Live Event (Buildings):", payload); // 👈 add this
                const { eventType, new: newItem, old: oldItem } = payload;

                queryClient.setQueryData(["buildings"], (old) => {
                    if (!old) return old;

                    switch (eventType) {
                        case "INSERT":
                            return old.some((b) => b.id === newItem.id)
                                ? old
                                : [...old, { ...newItem, building_media: [] }]; // insert with empty media

                        case "UPDATE":
                            return old.map((b) =>
                                b.id === newItem.id
                                    ? { ...b, ...newItem, building_media: b.building_media } // preserve existing media
                                    : b
                            );

                        case "DELETE":
                            return old.filter((b) => b.id !== oldItem.id);

                        default:
                            return old;
                    }
                });
            })
            .subscribe();

        //   building media (change)
        const mediaChannel = supabase
            .channel("building-media-realtime")
            .on("postgres_changes", { event: "*", schema: "public", table: "building_media" }, (payload) => {
                   console.log("📡 Live Event (Buildings_Media):", payload); // 👈 add this
                queryClient.setQueryData(["buildings"], (old) => {
                    if (!old) return old;

                    const { eventType, new: newItem, old: oldItem } = payload;

                    switch (eventType) {
                        case "INSERT":
                            return old.map((b) =>
                                b.id === newItem.building_id
                                    ? {
                                          ...b,
                                          building_media: [...(b.building_media || []), newItem],
                                      }
                                    : b
                            );

                        case "UPDATE":
                            return old.map((b) =>
                                b.id === newItem.building_id
                                    ? {
                                          ...b,
                                          building_media: (b.building_media || []).map((m) =>
                                              m.id === newItem.id ? newItem : m
                                          ),
                                      }
                                    : b
                            );

                        case "DELETE":
                            return old.map((b) =>
                                b.id === oldItem.building_id
                                    ? {
                                          ...b,
                                          building_media: (b.building_media || []).filter((m) => m.id !== oldItem.id),
                                      }
                                    : b
                            );

                        default:
                            return old;
                    }
                });
            })

            .subscribe();

        return () => {
            supabase.removeChannel(buildingsChannel);
            supabase.removeChannel(mediaChannel);
        };
    }, [queryClient]);

    return query;
}
