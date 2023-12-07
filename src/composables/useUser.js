import { useQuery } from "@tanstack/vue-query";
import { getCurrentUser } from "../services/apiAuth";
// by convention, composable function names start with "use"
export function useUser() {
  const {
    isLoading,
    data: user,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  // expose managed state as return value
  return { user, isLoading, isError };
}
