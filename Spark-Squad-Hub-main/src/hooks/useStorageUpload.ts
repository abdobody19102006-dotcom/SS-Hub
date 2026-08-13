import { useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useStorageUpload() {
  const upload = useCallback(async (file: File, folder: string) => {
    const ext = file.name.split('.').pop() || 'bin'
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const { error } = await supabase.storage.from('hub-assets').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })
    if (error) throw error

    const { data: urlData } = supabase.storage.from('hub-assets').getPublicUrl(path)
    return urlData.publicUrl
  }, [])

  const remove = useCallback(async (url: string) => {
    try {
      const urlObj = new URL(url)
      const pathMatch = urlObj.pathname.match(/hub-assets\/(.+)$/)
      if (pathMatch) {
        await supabase.storage.from('hub-assets').remove([pathMatch[1]])
      }
    } catch {
      // ignore — URL may not be a storage URL
    }
  }, [])

  return { upload, remove }
}
