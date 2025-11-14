'use client'

import { useState } from 'react'
import { Review } from '@/types/marketplace'
import ReviewForm from './review-form'
import ReviewList from './review-list'
import { Separator } from '@/components/ui/separator'

type ReviewsSectionProps = {
    productId: string
    reviews?: Review[]
    onReviewSubmitted?: () => void
}

export default function ReviewsSection({ productId, reviews = [], onReviewSubmitted }: ReviewsSectionProps) {
    const [showForm, setShowForm] = useState(false)

    const handleReviewSuccess = () => {
        setShowForm(false)
        onReviewSubmitted?.()
    }

    return (
        <div className='space-y-6 mt-8'>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold'>Reviews</h2>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className='px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm'
                    >
                        Write a Review
                    </button>
                )}
            </div>

            {showForm && (
                <>
                    <ReviewForm productId={productId} onSuccess={handleReviewSuccess} />
                    <button
                        onClick={() => setShowForm(false)}
                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                    >
                        Cancel
                    </button>
                </>
            )}

            <Separator />

            <ReviewList reviews={reviews} />
        </div>
    )
}
