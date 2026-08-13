import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useHubSetting(key: string) {
  const [value, setValue] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('hub_settings').select('value').eq('key', key).maybeSingle()
      setValue(data?.value ?? null)
      setLoaded(true)
    })()
  }, [key])

  const save = useCallback(async (newValue: string) => {
    const { error } = await supabase
      .from('hub_settings')
      .upsert({ key, value: newValue, updated_at: new Date().toISOString() })
    if (error) throw error
    setValue(newValue)
  }, [key])

  const clear = useCallback(async () => {
    await supabase.from('hub_settings').delete().eq('key', key)
    setValue(null)
  }, [key])

  return { value, loaded, save, clear }
}
