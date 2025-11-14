export interface CreateWithdrawalPayload {
     bankCardId: string
     orderIds: string[]
     note?: string
}

export interface Withdrawal {
     id: string
     userId: string
     bankCardId: string
     amount: number
     fee: number
     actualAmount: number
     status: 'pending' | 'approved' | 'rejected' | 'completed'
     note?: string
     adminNote?: string
     processedBy?: string
     processedAt?: string
     createdAt: string
     updatedAt: string
     orders: Array<{
          id: string
          totalAmount: string
          sellerEarnings: number
     }>
     bankCard: {
          id: string
          bankName: string
          accountNumber: string
          accountHolder: string
     }
}

export interface WithdrawalResponse {
     message: string
     data: Withdrawal
}

export interface WithdrawalsResponse {
     data: Withdrawal[]
}
