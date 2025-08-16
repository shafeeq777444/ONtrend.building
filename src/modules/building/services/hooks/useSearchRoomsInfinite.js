import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { getRoomsBasedOnSearchRange } from "../supabase/supabase.api";
import { supabase } from "@/lib/supabase/client";


export function useSearchRoomsInfinite({ adultCount = 1, childrenCount = 0 }) {
  const queryClient = useQueryClient();

  // Infinite query
  const query = useInfiniteQuery({
    queryKey: ["roomsInfinite", adultCount, childrenCount],
    queryFn: ({ pageParam = 0 }) =>
      getRoomsBasedOnSearchRange({
        adultCount,
        childrenCount,
        page: pageParam,
        pageSize: 10,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 10 ? undefined : allPages.length, // next page index
  });

  // Live updates via Supabase
  useEffect(() => {
    const subscription = supabase
      .channel("rooms-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms" },
        (payload) => {
          queryClient.setQueryData(
            ["roomsInfinite", adultCount, childrenCount],
            (oldData) => {
              if (!oldData) return oldData;

              return {
                ...oldData,
                pages: oldData.pages.map((page, pageIndex) => {
                  switch (payload.eventType) {
                    case "UPDATE":
                      return page.map((room) =>
                        room.id === payload.new.id
                          ? { ...room, ...payload.new }
                          : room
                      );

                    case "DELETE":
                      return page.filter((room) => room.id !== payload.old.id);

                    case "INSERT":
                      // Insert new room at the start of the first page
                      if (
                        payload.new.max_adults >= adultCount &&
                        payload.new.max_children >= childrenCount &&
                        pageIndex === 0
                      ) {
                        return [payload.new, ...page];
                      }
                      return page;

                    default:
                      return page;
                  }
                }),
              };
            }
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [adultCount, childrenCount, queryClient]);

  return query;
}
