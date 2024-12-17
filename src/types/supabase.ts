export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      documents: {
        Row: {
          id: string
          name: string
          url: string
          date: string
          type: 'invoice' | 'receipt' | 'bank_statement' | 'other'
          metadata: Json
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          url: string
          date: string
          type: 'invoice' | 'receipt' | 'bank_statement' | 'other'
          metadata?: Json
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          url?: string
          date?: string
          type?: 'invoice' | 'receipt' | 'bank_statement' | 'other'
          metadata?: Json
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      exercises: {
        Row: {
          id: string
          title: string
          description: string
          created_at: string
          updated_at: string
          solution: Json
          entries: Json
          auto_correct: boolean
        }
        Insert: {
          id?: string
          title: string
          description: string
          created_at?: string
          updated_at?: string
          solution?: Json
          entries?: Json
          auto_correct?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string
          created_at?: string
          updated_at?: string
          solution?: Json
          entries?: Json
          auto_correct?: boolean
        }
      }
      submissions: {
        Row: {
          id: string
          exercise_id: string
          user_id: string
          entries: Json
          feedback: string | null
          score: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          exercise_id: string
          user_id: string
          entries: Json
          feedback?: string | null
          score?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          exercise_id?: string
          user_id?: string
          entries?: Json
          feedback?: string | null
          score?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          role: 'admin' | 'teacher' | 'student'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          role?: 'admin' | 'teacher' | 'student'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          role?: 'admin' | 'teacher' | 'student'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
  Tables: {
    system_settings: {
      Row: {
        id: number
        supabase: {
          url: string
          anonKey: string
        }
        openai: {
          apiKey: string
          model: string
          maxTokens: number
          temperature: number
        }
        general: {
          maxAttempts: number
          autoGrading: boolean
          feedbackDelay: number
          defaultIGICRate: number
        }
        created_at: string
        updated_at: string
      }
      Insert: {
        id?: number
        supabase?: {
          url?: string
          anonKey?: string
        }
        openai?: {
          apiKey?: string
          model?: string
          maxTokens?: number
          temperature?: number
        }
        general?: {
          maxAttempts?: number
          autoGrading?: boolean
          feedbackDelay?: number
          defaultIGICRate?: number
        }
        created_at?: string
        updated_at?: string
      }
      Update: {
        id?: number
        supabase?: {
          url?: string
          anonKey?: string
        }
        openai?: {
          apiKey?: string
          model?: string
          maxTokens?: number
          temperature?: number
        }
        general?: {
          maxAttempts?: number
          autoGrading?: boolean
          feedbackDelay?: number
          defaultIGICRate?: number
        }
        created_at?: string
        updated_at?: string
      }
    }
}