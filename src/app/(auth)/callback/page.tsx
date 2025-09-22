'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
    const router = useRouter()

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                const { data, error } = await supabase.auth.getSession()

                if (error) {
                    console.error('Error getting session:', error) 
                    router.push('/login?error=auth_callback_error')
                    return
                }

                if (data.session) {
                   
                    router.push('/')
                } else {
                    
                    router.push('/login')
                }
            } catch (err) {
                console.error('Auth callback error:', err)
                router.push('/login?error=auth_callback_error') 
            }
        }

        handleAuthCallback()
    }, [router])

    return (
        <p>Đang xử lý đăng nhập...</p>
    )
}