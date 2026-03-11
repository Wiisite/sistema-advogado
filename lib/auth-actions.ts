'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { authenticateUser, generateToken, createUser } from './auth'

export async function signIn(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const user = await authenticateUser(email, password)

    if (!user) {
        return { error: 'Email ou senha inválidos' }
    }

    const token = generateToken(user)
    
    cookies().set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 dias
    })

    redirect('/dashboard')
}

export async function signOut() {
    cookies().delete('auth_token')
    redirect('/login')
}

export async function signUp(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string

    try {
        const user = await createUser(email, password, fullName)
        
        if (!user) {
            return { success: false, error: 'Erro ao criar usuário' }
        }

        return { success: true, data: user }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export async function getCurrentUser() {
    const token = cookies().get('auth_token')?.value
    
    if (!token) {
        return null
    }

    const { verifyToken } = await import('./auth')
    return verifyToken(token)
}
