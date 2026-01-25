export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titlePt: string;
  excerpt: string;
  excerptPt: string;
  category: 'interviews' | 'career' | 'international' | 'technical';
  tags: string[];
  tagsPt: string[];
  date: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'preparing-for-net-interviews',
    title: 'Preparing for .NET Technical Interviews',
    titlePt: 'Preparando-se para Entrevistas Técnicas .NET',
    excerpt: 'A comprehensive guide to ace your .NET interviews with practical tips and common questions.',
    excerptPt: 'Um guia completo para se destacar em entrevistas .NET com dicas práticas e perguntas comuns.',
    category: 'interviews',
    tags: ['C#', '.NET', 'ASP.NET Core', 'Interview Tips'],
    tagsPt: ['C#', '.NET', 'ASP.NET Core', 'Dicas de Entrevista'],
    date: '2026-01-15',
    readTime: 8,
  },
  {
    id: '2',
    slug: 'transitioning-to-international-tech',
    title: 'Transitioning to International Tech Opportunities',
    titlePt: 'Transição para Oportunidades Internacionais em Tech',
    excerpt: 'Learn how to position yourself for international job opportunities and navigate the global tech job market.',
    excerptPt: 'Aprenda como se posicionar para oportunidades de trabalho internacionais e navegue no mercado global de tech.',
    category: 'international',
    tags: ['Career', 'International', 'Job Search', 'Networking'],
    tagsPt: ['Carreira', 'Internacional', 'Busca de Emprego', 'Networking'],
    date: '2026-01-10',
    readTime: 10,
  },
  {
    id: '3',
    slug: 'async-await-best-practices',
    title: 'Async/Await Best Practices in C#',
    titlePt: 'Melhores Práticas de Async/Await em C#',
    excerpt: 'Master async/await patterns and avoid common pitfalls in your C# applications.',
    excerptPt: 'Domine padrões async/await e evite armadilhas comuns em suas aplicações C#.',
    category: 'technical',
    tags: ['C#', 'Async/Await', 'Best Practices', 'Performance'],
    tagsPt: ['C#', 'Async/Await', 'Melhores Práticas', 'Performance'],
    date: '2026-01-05',
    readTime: 7,
  },
];
