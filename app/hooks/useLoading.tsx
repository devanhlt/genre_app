import React from "react"

import { LoadingFullScreen } from "app/components/Loading"

type Loading = {
  loading: boolean
  show: () => void
  hide: () => void
}

export interface LoadingProviderProps {
  children: React.ReactNode
}

const LoadingContext = React.createContext<Loading>({
  loading: false,
  show: () => null,
  hide: () => null,
})

export const useLoading = () => React.useContext(LoadingContext)

export function LoadingProvider(props: LoadingProviderProps) {
  const [loading, setLoading] = React.useState(false)

  return (
    <LoadingContext.Provider
      value={{
        loading,
        show: () => setLoading(true),
        hide: () => setLoading(false),
      }}
    >
      {props.children}
      {!!loading && <LoadingFullScreen />}
    </LoadingContext.Provider>
  )
}
