export interface Product {
  id: string
  name: string
  category: 'Coffee' | 'Non-Coffee' | 'Resto'
  description: string
  price: number
  image: string
  tags: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  rating: number
  avatarSeed: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  authorId: string
  publishedAt: string
  tags: string[]
  coverImage?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  photo: string
  email?: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'member'
}

export interface RandomUserApiResult {
  results: RandomUserApiPerson[]
}

export interface RandomUserApiPerson {
  login: { uuid: string }
  name: { first: string; last: string; title: string }
  email: string
  picture: { large: string; medium: string; thumbnail: string }
  cell: string
}
