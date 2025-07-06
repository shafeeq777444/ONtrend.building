import { supabase } from '../client'

export const getJobOpenings = async () => {
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)  // Only fetch jobs that are active
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}
