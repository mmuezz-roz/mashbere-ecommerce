require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('products')
    .select('id, slug, name, description')
    .eq('category', 'sip-up');
    
  if (error) console.error(error);
  else console.log(JSON.stringify(data, null, 2));
}
run();
