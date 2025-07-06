import { supabase } from '../client'

export const submitCareerForm = async (formData, resumeFile) => {
    let resume_url = ''

    if (resumeFile) {
        const fileExt = resumeFile.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('resumes')
            .upload(fileName, resumeFile)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase
            .storage
            .from('resumes')
            .getPublicUrl(fileName)

        resume_url = urlData.publicUrl
    }

    const { error: insertError } = await supabase
        .from('careers')
        .insert([{ ...formData, resume_url }])

    if (insertError) throw insertError
}
