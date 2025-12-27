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
      badges: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          requirements: Json | null
          slug: string
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          requirements?: Json | null
          slug: string
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          requirements?: Json | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          role: string
          session_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          role: string
          session_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          role?: string
          session_id?: string | null
        }
        Relationships: []
      }
      chat_sessions: {
        Row: {
          created_at: string | null
          id: string
          quest_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          quest_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          quest_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      daily_activity: {
        Row: {
          activity_date: string
          created_at: string | null
          id: string
          quests_completed: number | null
          time_spent_minutes: number | null
          user_id: string | null
          xp_earned: number | null
        }
        Insert: {
          activity_date: string
          created_at?: string | null
          id?: string
          quests_completed?: number | null
          time_spent_minutes?: number | null
          user_id?: string | null
          xp_earned?: number | null
        }
        Update: {
          activity_date?: string
          created_at?: string | null
          id?: string
          quests_completed?: number | null
          time_spent_minutes?: number | null
          user_id?: string | null
          xp_earned?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          career_track: string | null
          created_at: string | null
          current_streak: number | null
          daily_goal_minutes: number | null
          display_name: string | null
          id: string
          last_activity_date: string | null
          learning_style: string | null
          level: number | null
          longest_streak: number | null
          onboarding_completed: boolean | null
          updated_at: string | null
          username: string
          xp: number | null
        }
        Insert: {
          avatar_url?: string | null
          career_track?: string | null
          created_at?: string | null
          current_streak?: number | null
          daily_goal_minutes?: number | null
          display_name?: string | null
          id: string
          last_activity_date?: string | null
          learning_style?: string | null
          level?: number | null
          longest_streak?: number | null
          onboarding_completed?: boolean | null
          updated_at?: string | null
          username: string
          xp?: number | null
        }
        Update: {
          avatar_url?: string | null
          career_track?: string | null
          created_at?: string | null
          current_streak?: number | null
          daily_goal_minutes?: number | null
          display_name?: string | null
          id?: string
          last_activity_date?: string | null
          learning_style?: string | null
          level?: number | null
          longest_streak?: number | null
          onboarding_completed?: boolean | null
          updated_at?: string | null
          username?: string
          xp?: number | null
        }
        Relationships: []
      }
      quests: {
        Row: {
          content: Json | null
          created_at: string | null
          description: string | null
          difficulty: string
          estimated_minutes: number | null
          id: string
          is_published: boolean | null
          order_index: number | null
          prerequisites: string[] | null
          quest_type: string
          slug: string
          subtrack_id: string | null
          title: string
          updated_at: string | null
          xp_reward: number | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          description?: string | null
          difficulty: string
          estimated_minutes?: number | null
          id?: string
          is_published?: boolean | null
          order_index?: number | null
          prerequisites?: string[] | null
          quest_type: string
          slug: string
          subtrack_id?: string | null
          title: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          description?: string | null
          difficulty?: string
          estimated_minutes?: number | null
          id?: string
          is_published?: boolean | null
          order_index?: number | null
          prerequisites?: string[] | null
          quest_type?: string
          slug?: string
          subtrack_id?: string | null
          title?: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Relationships: []
      }
      subtracks: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_locked: boolean | null
          order_index: number | null
          slug: string
          title: string
          track_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_locked?: boolean | null
          order_index?: number | null
          slug: string
          title: string
          track_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_locked?: boolean | null
          order_index?: number | null
          slug?: string
          title?: string
          track_id?: string | null
        }
        Relationships: []
      }
      tracks: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_locked: boolean | null
          order_index: number | null
          slug: string
          title: string
          unlock_requirements: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_locked?: boolean | null
          order_index?: number | null
          slug: string
          title: string
          unlock_requirements?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_locked?: boolean | null
          order_index?: number | null
          slug?: string
          title?: string
          unlock_requirements?: Json | null
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          ai_feedback: Json | null
          completed_at: string | null
          created_at: string | null
          id: string
          quest_id: string | null
          started_at: string | null
          status: string
          submission_data: Json | null
          submission_type: string | null
          updated_at: string | null
          user_id: string | null
          xp_earned: number | null
        }
        Insert: {
          ai_feedback?: Json | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          quest_id?: string | null
          started_at?: string | null
          status?: string
          submission_data?: Json | null
          submission_type?: string | null
          updated_at?: string | null
          user_id?: string | null
          xp_earned?: number | null
        }
        Update: {
          ai_feedback?: Json | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          quest_id?: string | null
          started_at?: string | null
          status?: string
          submission_data?: Json | null
          submission_type?: string | null
          updated_at?: string | null
          user_id?: string | null
          xp_earned?: number | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
