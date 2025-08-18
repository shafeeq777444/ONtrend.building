export function updateCacheFromRealtime(queryClient, key, payload, pk = "id") {
    console.log("updateCacheFromRealtime", key, payload);
  queryClient.setQueryData([key], (old) => {
    const { eventType, new: newItem, old: oldItem } = payload;

    if (!old) return old; // don't mutate until initial query is loaded

    switch (eventType) {
      case "INSERT":
        return old.some((item) => item[pk] === newItem[pk])
          ? old
          : [...old, newItem];

      case "UPDATE":
        return old.map((item) =>
          item[pk] === newItem[pk] ? { ...item, ...newItem } : item
        );

      case "DELETE":
        return old.filter((item) => item[pk] !== oldItem[pk]);

      default:
        return old;
    }
  });
}
