import { useQueryClient } from "@tanstack/react-query";
export function ClearAllCacheButton() {
  const queryClient = useQueryClient();
  return <button className="fixed top-1 right-1 bg-onRed rounded-2xl z-100 cursor-pointer" onClick={() => queryClient.clear()}>Clear All Cache</button>;
} 