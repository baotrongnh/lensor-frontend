'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function AuthCallback() {
    const router = useRouter()

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                const { data, error } = await supabase.auth.getSession()

                if (error) {
                    console.error('Error getting session:', error)
                    toast.error('An error occurred while processing the login. Please try again.')
                    router.push('/login?error=auth_callback_error')
                    return
                }

                if (data.session) {
                    toast.success('Login successful!')
                    router.push('/')

                } else {
                    toast.error('Invalid login session. Please try again.')
                    router.push('/login')

                }
            } catch (err) {
                console.error('Auth callback error:', err)
                toast.error('An error occurred while processing the login. Please try again.')
                router.push('/login?error=auth_callback_error')
            }
        }

        handleAuthCallback()
    }, [router])

    return (
        <p>Processing login...</p>
    )
}