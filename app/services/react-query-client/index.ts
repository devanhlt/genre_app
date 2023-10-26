import { QueryClient, QueryClientConfig } from "@tanstack/react-query"

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      notifyOnChangeProps: ["data"],
      retry: 2, // retried 2 times
      /**
       * The time React Query considers cached data as fresh
       * Specifying a longer staleTime means queries will not refetch their data as often
       */
      staleTime: 10 * 60 * 1000, // 10 mins
    },
  },
}

class QueryClientInstance {
  queryClient: QueryClient
  constructor() {
    this.queryClient = null
  }

  setup() {
    this.queryClient = new QueryClient(queryClientConfig)
  }

  getInstance() {
    if (!this.queryClient) this.setup()
    return this.queryClient
  }
}

const QueryClientSetup = new QueryClientInstance()

export default QueryClientSetup
