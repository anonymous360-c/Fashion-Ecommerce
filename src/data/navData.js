export const topLinks = [
  { label: 'Women',            href: '/women' },
  { label: 'Men',              href: '/men' },
  { label: 'About',            href: '/about' },
  { label: 'Everworld Stories',href: '/stories' },
]

// sub-nav shown for WOMEN
export const womenNavItems = [
  { label: 'New Arrivals',    href: '/women', hasMega: false },
  { label: 'Best-Sellers',    href: '#' },
  { label: 'Clothing',        href: '#' },
  { label: 'Tops & Sweaters', href: '#' },
  { label: 'Pants & Jeans',   href: '#' },
  { label: 'Dresses',         href: '#' },
  { label: 'Outerwear',       href: '#' },
  { label: 'Shoes & Bags',    href: '#' },
  { label: 'Accessories',     href: '#' },
  { label: 'Sale',            href: '#', isSale: true },
]

// sub-nav shown for MEN
export const menNavItems = [
  { label: 'Holiday Gifting', href: '#' },
  { label: 'New Arrivals',    href: '#', hasMega: true },
  { label: 'Best-Sellers',    href: '#' },
  { label: 'Clothing',        href: '#' },
  { label: 'Tops & Sweaters', href: '#' },
  { label: 'Pants & Jeans',   href: '#' },
  { label: 'Outerwear',       href: '#' },
  { label: 'Shoes & Bags',    href: '#' },
  { label: 'Sale',            href: '#', isSale: true },
]


export const mainNavItems = menNavItems

export const aboutNavItems = [
  { label: 'About',                     href: '/about' },
  { label: 'Stores',                    href: '/stores' },
  { label: 'Factories',                 href: '#' },
  { label: 'Environmental Initiatives', href: '#' },
  { label: 'Our Carbon Commitment',     href: '#' },
  { label: 'Annual Impact Report',      href: '#' },
  { label: 'Cleaner Fashion',           href: '#' },
]

export const megaMenu = {
  highlights: [
    'Shop All New Arrivals',
    'The Gift Guide',
    'New Bottoms',
    'New Tops',
    'T-Shirt Bundles',
    'Under $100',
  ],
  featuredShops: [
    'The Holiday Outfit Edit',
    'Giftable Sweaters',
    'Uniform & Capsule',
    'The Performance Chino Shop',
    "Top Rated Men's Clothing",
  ],
  images: [
    {
      label: 'The Holiday Outfit Edit',
      src: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&q=80',
    },
    {
      label: 'Giftable Sweaters',
      src: 'https://images.unsplash.com/photo-1584940120743-8990f8a73f38?w=400&q=80',
    },
  ],
}
