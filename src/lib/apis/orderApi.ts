import { apiClient } from "./client"
import { endpoints } from "./endpoints"

export const orderApi = {
    checkout: async () => {
        const res = await apiClient.post(endpoints.orders.checkout)
        return res.data
    },

    getAllOrders: async () => {
        const res = await apiClient.get(endpoints.orders.all)
        return res.data
    },

    getOrderById: async (orderId: string) => {
        const res = await apiClient.get(endpoints.orders.byId(orderId))
        return res.data
    },

    getOrderProducts: async (orderId: string) => {
        const res = await apiClient.get(endpoints.orders.products(orderId))
        return res.data
    }
}
