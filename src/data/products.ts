import coldBrew from '@/assets/images/drink-cold-brew.jpg'
import matcha from '@/assets/images/drink-matcha.jpg'
import latte from '@/assets/images/drink-latte.jpg'
import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'kopi-susu-gula-aren',
    name: 'Kopi Susu Gula Aren',
    category: 'Coffee',
    description:
      'Espresso rumahan dipadu susu segar dan gula aren asli, disajikan dingin dengan lapisan krema tipis di atasnya.',
    price: 22000,
    image: latte,
    tags: ['Best Seller', 'Signature'],
  },
  {
    id: 'bokvra-cold-brew',
    name: 'Bokvra Cold Brew',
    category: 'Coffee',
    description:
      'Diseduh dingin selama 18 jam untuk rasa yang halus, rendah asam, dengan sedikit sentuhan karamel di akhir tegukan.',
    price: 25000,
    image: coldBrew,
    tags: ['Low Acid'],
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    category: 'Non-Coffee',
    description:
      'Bubuk matcha ceremonial grade dikocok tangan, dicampur susu segar — creamy, earthy, dan tidak terlalu manis.',
    price: 24000,
    image: matcha,
    tags: ['Non-Coffee'],
  },
]
