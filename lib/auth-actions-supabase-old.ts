'use server'

import { supabase } from './supabase'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        console.error('Erro de autenticação:', error.message)
        return { error: error.message || 'Credenciais inválidas' }
    }

    if (data.user) {
        redirect('/dashboard')
    }

    return { error: 'Erro ao fazer login' }
}

export async function signOut() {
    try {
        await supabase.auth.signOut()
    } catch (error) {
        console.error('Erro ao fazer logout:', error)
    }
    redirect('/login')
}

export async function signUp(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        })

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, data }
    } catch (error) {
        return { success: false, error: 'Erro ao criar conta' }
    }
}
