import {QueryClient} from 'react-query';
import {Alert} from 'react-native';

function queryErrorHandler(error: any): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  // prevent duplicate toasts
  Alert.alert(title, error);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      // staleTime: 600000, // 10 minutes
      // cacheTime: 900000, // default cacheTime is 5 minutes; doesn't make sense for staleTime to exceed cacheTime,
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});

const optimisticOptions = (query: any) => {
  return {
    // When mutate is called:
    onMutate: async (newChange: any) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries([query, newChange.id]);

      // Snapshot the previous value
      const previousTodo = await queryClient.getQueryData([
        query,
        newChange.id,
      ]);

      // Optimistically update to the new value
      await queryClient.setQueryData([query, newChange.id], newChange);

      // Return a context with the previous and new todo
      return {previousTodo, newChange};
    },
    // If the mutation fails, use the context we returned above
    onError: async (err: any, newChange: any, context: any) => {
      await queryClient.setQueryData(
        [query, context.newTodo.id],
        context.previousTodo,
      );
    },
    // Always refetch after error or success:
    onSettled: async (newChange: any) => {
      //await queryClient.invalidateQueries([query, newChange.id]); why not working
      await queryClient.invalidateQueries([query]);
    },
  };
};

export {queryClient, optimisticOptions};
