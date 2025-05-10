import useSWR from 'swr'

export function useConditionalSWR(
  url: string,
  shouldFetch: string | boolean | number | undefined | Date
) {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    shouldFetch ? url : null
  )

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating
  }
}
