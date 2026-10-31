import type { PhotoStatus } from "@/types/photo";

export const photoKeys = {
  all: ["photos"] as const,
  lists: () => [...photoKeys.all, "list"] as const,
  byStatus: (status: PhotoStatus) => [...photoKeys.lists(), { status }] as const,
  infinite: () => [...photoKeys.lists(), "infinite"] as const,
};
