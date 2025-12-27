export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          learning_style: 'visual' | 'auditory' | 'kinesthetic' | null
          career_track: 'freelancer' | 'entrepreneur' | 'career' | 'hobbyist' | null
          daily_goal_minutes: number
          xp: number
          level: number
          current_streak: number
          longest_streak: number
          last_activity_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          learning_style?: 'visual' | 'auditory' | 'kinesthetic' | null
          career_track?: 'freelancer' | 'entrepreneur' | 'career' | 'hobbyist' | null
          daily_goal_minutes?: number
          xp?: number
          level?: number
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          learning_style?: 'visual' | 'auditory' | 'kinesthetic' | null
          career_track?: 'freelancer' | 'entrepreneur' | 'career' | 'hobbyist' | null
          daily_goal_minutes?: number
          xp?: number
          level?: number
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tracks: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          icon: string | null
          order_index: number | null
          is_locked: boolean
          unlock_requirements: Json | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          icon?: string | null
          order_index?: number | null
          is_locked?: boolean
          unlock_requirements?: Json | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          icon?: string | null
          order_index?: number | null
          is_locked?: boolean
          unlock_requirements?: Json | null
        }
      }
      quests: {
        Row: {
          id: string
          subtrack_id: string | null
          slug: string
          title: string
          description: string | null
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          estimated_minutes: number | null
          xp_reward: number
          quest_type: 'lesson' | 'practice' | 'boss' | 'daily'
          content: Json | null
          prerequisites: string[] | null
          order_index: number | null
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          subtrack_id?: string | null
          slug: string
          title: string
          description?: string | null
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          estimated_minutes?: number | null
          xp_reward?: number
          quest_type: 'lesson' | 'practice' | 'boss' | 'daily'
          content?: Json | null
          prerequisites?: string[] | null
          order_index?: number | null
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          subtrack_id?: string | null
          slug?: string
          title?: string
          description?: string | null
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          estimated_minutes?: number | null
          xp_reward?: number
          quest_type?: 'lesson' | 'practice' | 'boss' | 'daily'
          content?: Json | null
          prerequisites?: string[] | null
          order_index?: number | null
          is_published?: boolean
          created_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          quest_id: string
          status: 'locked' | 'available' | 'in_progress' | 'completed'
          started_at: string | null
          completed_at: string | null
          submission_type: string | null
          submission_data: Json | null
          ai_feedback: Json | null
          xp_earned: number | null
        }
        Insert: {
          id?: string
          user_id: string
          quest_id: string
          status: 'locked' | 'available' | 'in_progress' | 'completed'
          started_at?: string | null
          completed_at?: string | null
          submission_type?: string | null
          submission_data?: Json | null
          ai_feedback?: Json | null
          xp_earned?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          quest_id?: string
          status?: 'locked' | 'available' | 'in_progress' | 'completed'
          started_at?: string | null
          completed_at?: string | null
          submission_type?: string | null
          submission_data?: Json | null
          ai_feedback?: Json | null
          xp_earned?: number | null
        }
      }
      badges: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          icon: string | null
          category: string | null
          requirements: Json | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          icon?: string | null
          category?: string | null
          requirements?: Json | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          icon?: string | null
          category?: string | null
          requirements?: Json | null
        }
      }
      user_badges: {
        Row: {
          user_id: string
          badge_id: string
          earned_at: string
        }
        Insert: {
          user_id: string
          badge_id: string
          earned_at?: string
        }
        Update: {
          user_id?: string
          badge_id?: string
          earned_at?: string
        }
      }
      daily_activity: {
        Row: {
          id: string
          user_id: string
          activity_date: string
          xp_earned: number
          quests_completed: number
          time_spent_minutes: number
        }
        Insert: {
          id?: string
          user_id: string
          activity_date: string
          xp_earned?: number
          quests_completed?: number
          time_spent_minutes?: number
        }
        Update: {
          id?: string
          user_id?: string
          activity_date?: string
          xp_earned?: number
          quests_completed?: number
          time_spent_minutes?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
