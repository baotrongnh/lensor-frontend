import { apiClient } from "./client"
import { endpoints } from "./endpoints"

export const marketplaceApi = {
     getAll: async () => {
          const res = await apiClient.get(endpoints.marketplace.all)
          return res.data
     },

     getById: async (id: string) => {
          const res = await apiClient.get(endpoints.product.byId(id))
          return res.data
     }
}