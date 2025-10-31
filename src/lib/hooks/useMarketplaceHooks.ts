import useSWR from "swr"
import { endpoints } from "../apis/endpoints"
import { marketplaceApi } from "../apis/marketplaceApi"
import { postApi } from "../apis/postApi"

export const useMarketplace = () => {
     const { data, error, isLoading, mutate, isValidating } = useSWR(endpoints.marketplace.all, marketplaceApi.getAll)
     return { data, error, isLoading, mutate, isValidating }
}

export const useMarketplaceDetail = (id: string) => {
     const { data: dataRaw, error, isLoading, mutate } = useSWR(
          endpoints.product.byId(id),
          () => marketplaceApi.getById(id)
     )
     const data = dataRaw?.data
     return { data, error, isLoading, mutate }
}
