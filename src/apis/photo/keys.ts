export const photoKeys = {
  all: ["photos"] as const,
  lists: () => [...photoKeys.all, "list"] as const,
  statuses: () => [...photoKeys.lists(), "status"] as const,
  infinite: () => [...photoKeys.lists(), "infinite"] as const,
  details: () => [...photoKeys.all, "detail"] as const,
  detail: (id: string) => [...photoKeys.details(), id] as const,
};
