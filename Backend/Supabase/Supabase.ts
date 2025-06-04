// src/lib/supabase.ts
// import { createClient } from '@supabase/supabase-js';
// import dotenv from 'dotenv';
// dotenv.config();

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
//   throw new Error('Missing Supabase URL or keys in environment variables');
// }

// // Client for frontend (use anon key)
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // Client for server-side or scripts (use service key)
// export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);


import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
    throw new Error('Missing Supabase URL or keys in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
// Save feedback from users
export const saveFeedback = async (feedback: string) => {
    const { data, error } = await supabaseAdmin
        .from('feedback')
        .insert([{ message: feedback, created_at: new Date().toISOString() }]);
    if (error) {
        console.error('Error saving feedback:', error);
        throw error;
    }
    return data;
};

// Fetch all research labs (Utkarsh, Udaan)
export const getResearchLabs = async () => {
    const { data, error } = await supabaseAdmin
        .from('research_labs')
        .select('name, description')
        .order('name', { ascending: true });
    if (error) {
        console.error('Error fetching research labs:', error);
        throw error;
    }
    return data || [];
};

// Fetch specific research labs (Bio Medical Imaging, IoT & Robotics, etc.)
export const getSpecificResearchLabs = async () => {
    const { data, error } = await supabaseAdmin
        .from('specific_research_labs')
        .select('name, description, projects')
        .order('name', { ascending: true });
    if (error) {
        console.error('Error fetching specific research labs:', error);
        throw error;
    }
    return data || [];
};

// Fetch faculty for a specific research lab
export const getResearchFaculty = async (labName: string) => {
    const { data, error } = await supabaseAdmin
        .from('research_faculty')
        .select('name')
        .eq('lab_name', labName)
        .order('name', { ascending: true });
    if (error) {
        console.error(`Error fetching faculty for lab ${labName}:`, error);
        throw error;
    }
    return data || [];
};

// Fetch educational tools (Tessellator, Sanjaya, etc.)
export const getEducationalTools = async () => {
    const { data, error } = await supabaseAdmin
        .from('educational_tools')
        .select('name, description, features')
        .order('name', { ascending: true });
    if (error) {
        console.error('Error fetching educational tools:', error);
        throw error;
    }
    return data || [];
};

// Fetch events within a date range
export const getEvents = async (startDate?: string, endDate?: string) => {
    let query = supabaseAdmin
        .from('events')
        .select('name, date, description, activities')
        .order('date', { ascending: false });

    if (startDate && endDate) {
        query = query.gte('date', startDate).lte('date', endDate);
    }

    const { data, error } = await query;
    if (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
    return data || [];
};

// Fetch GSoC participation
export const getGSoCParticipation = async () => {
    const { data, error } = await supabaseAdmin
        .from('gsoc_participation')
        .select('student_name, organization, project_name, participation_year')
        .order('participation_year', { ascending: false });
    if (error) {
        console.error('Error fetching GSoC participation:', error);
        throw error;
    }
    return data || [];
};