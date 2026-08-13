import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

interface SupabaseRow {
  id: string
  [key: string]: unknown
}

export function useSupabaseTable<T extends SupabaseRow>(table: string, orderBy = 'sort_order') {
  const [rows, setRows] = useState<T[]>([])
  const [loaded, setLoaded] = useState(false)

  const load = useCallback(async () => {
    const { data, error } = await supabase.from(table).select('*').order(orderBy)
    if (error) {
      console.error(`Error loading ${table}:`, error.message)
    }
    setRows((data || []) as T[])
    setLoaded(true)
  }, [table, orderBy])

  useEffect(() => {
    load()
  }, [load])

  const insert = useCallback(async (row: Omit<T, 'id'>) => {
    const { data, error } = await supabase.from(table).insert(row).select().single()
    if (error) throw error
    setRows((prev) => [...prev, data as T])
    return data as T
  }, [table])

  const update = useCallback(async (id: string, updates: Partial<T>) => {
    const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single()
    if (error) throw error
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...data } as T : r)))
    return data as T
  }, [table])

  const remove = useCallback(async (id: string) => {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
    setRows((prev) => prev.filter((r) => r.id !== id))
  }, [table])

  return { rows, loaded, insert, update, remove, reload: load }
}
