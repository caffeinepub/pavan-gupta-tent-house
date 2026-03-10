import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useBusinessInfo() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["businessInfo"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBusinessInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      message: string;
      eventDate: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const ts = BigInt(new Date(data.eventDate).getTime());
      return actor.submitInquiry(data.name, data.phone, data.message, ts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
