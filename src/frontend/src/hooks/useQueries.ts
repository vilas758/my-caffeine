import { useMutation } from "@tanstack/react-query";
import type { ContactInquiry } from "../backend.d";
import { useActor } from "./useActor";

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (input: ContactInquiry) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(input);
    },
  });
}
