require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const newDescriptions = {
  "mango-sipup": "Experience the legendary Alphonso mango in a thick, velvety smooth sip-up. Every drop bursts with intense tropical sweetness, capturing the true essence of summer.",
  "guava-sipup": "Rediscover the timeless flavor of exotic pink guava with a perfectly balanced, pulpy texture. Taste the pure, unadulterated essence of real fruit in every refreshing sip.",
  "grapes-sipup": "Dive into the deep, rich flavors of premium cold-pressed black grapes. Enjoy a naturally sweet, remarkably crisp finish that offers sophisticated daily hydration.",
  "lychee-sipup": "Enjoy the delicate, floral notes of fresh lychee in this elegant summer cooler. Crafted to maintain its natural juicy profile, it brings a subtle sweetness that revitalizes your senses.",
  "passion-fruit-sipup": "Embark on an intense tropical journey featuring zesty passion fruit. Balancing sharp citrus notes with aromatic sweetness, this vibrant punch instantly wakes up your tastebuds.",
  "pineapple-sipup": "Taste the sunshine with our golden, cold-pressed tropical pineapple nectar. Bursting with bright, tangy energy, it delivers crisp tropical goodness in a convenient sealed pouch.",
  "pomegranate-sipup": "Indulge in the bold, rich taste of cold-pressed ruby pomegranate juice. Bursting with natural antioxidants, it offers a sophisticated balance of deep sweetness and refreshing tartness.",
  "sugar-cane-sipup": "Experience nature's ultimate energy drink with freshly pressed raw sugarcane juice. Infused with a hint of lime and ginger, it delivers crisp, authentic hydration.",
  "tender-coconut-sipup": "Hydrate naturally with pure water sourced from coastal tender coconuts. Featuring soft, fresh pulp bits, this electrolyte-rich cooler instantly transports you to a tropical island.",
  "strawberry-bliss-ice-stick": "Delight in the vibrant, naturally sweet flavor of sun-ripened strawberries. Crafted for a smooth and creamy finish, this on-the-go treat is a nostalgic, guilt-free indulgence."
};

async function run() {
  for (const [slug, desc] of Object.entries(newDescriptions)) {
    const { error } = await supabase
      .from('products')
      .update({ description: desc })
      .eq('slug', slug);
      
    if (error) {
      console.error('Failed to update ' + slug + ':', error);
    } else {
      console.log('Successfully updated ' + slug);
    }
  }
}
run();
