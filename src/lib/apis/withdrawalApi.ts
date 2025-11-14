import { apiClient } from "./client"
import { endpoints } from "./endpoints"
import { CreateWithdrawalPayload, WithdrawalResponse, WithdrawalsResponse } from "@/types/withdrawal"

export const withdrawalApi = {
     // Create withdrawal request
     createWithdrawal: async (payload: CreateWithdrawalPayload): Promise<WithdrawalResponse> => {
          const res = await apiClient.post(endpoints.withdrawal.create, payload)
          return res.data
     },

     // Get all withdrawals
     getWithdrawals: async (): Promise<WithdrawalsResponse> => {
          const res = await apiClient.get(endpoints.withdrawal.all)
          return res.data
     }
}
