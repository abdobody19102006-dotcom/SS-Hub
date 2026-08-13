/*
# Storage bucket policies for hub-assets

Creates public read/write policies for the 'hub-assets' storage bucket.
Single-tenant app — all uploads are intentionally public.
*/

CREATE POLICY "anon_read_hub_assets" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'hub-assets');

CREATE POLICY "anon_insert_hub_assets" ON storage.objects FOR INSERT
  TO anon, authenticated WITH CHECK (bucket_id = 'hub-assets');

CREATE POLICY "anon_update_hub_assets" ON storage.objects FOR UPDATE
  TO anon, authenticated USING (bucket_id = 'hub-assets') WITH CHECK (bucket_id = 'hub-assets');

CREATE POLICY "anon_delete_hub_assets" ON storage.objects FOR DELETE
  TO anon, authenticated USING (bucket_id = 'hub-assets');
