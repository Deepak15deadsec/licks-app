import { queryClient, optimisticOptions } from "./Client";
import { getRequest, updateRequest, deleteRequest } from "./apiFunction";
import ReactQueryLoading from "./ReactQueryLoading";
import { queries } from "./Queries";

export { queryClient, optimisticOptions, queries, getRequest, updateRequest, deleteRequest};
export default ReactQueryLoading;
