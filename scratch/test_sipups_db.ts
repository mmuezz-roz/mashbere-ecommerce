
import { createClient } from '@supabase/supabase-js';

async function test() {
  const supabase = createClient(
    'https://gtihbzjndppypmdzsfla.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aWhiempuZHBweXBtZHpzZmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MDIyNjMsImV4cCI6MjA5MTk3ODI2M30.J3N--XvWzuEufMEJKTAMqao7KUeHnwP7qQ4m6e_2BSQ'
  );

  const { data, error } = await supabase
    .from('products')
    .select('name, image, slug, category')
    .eq('category', 'sip-up');

  if (error) {
    console.error(error);
    return;
  }

  console.log('Sipups in DB:', data.length);
  data.forEach((s, i) => {
    console.log(`${i}: ${s.name} - ${s.image} (${s.slug})`);
  });
}

test();
