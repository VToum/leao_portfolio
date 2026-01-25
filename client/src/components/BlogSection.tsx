import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { blogPosts, BlogPost } from '@/data/blog-posts';
import { Calendar, Clock } from 'lucide-react';

type CategoryType = 'interviews' | 'career' | 'international' | 'technical';

export const BlogSection: React.FC = () => {
  const { t, currentLanguage } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  const categories: { key: CategoryType; label: string }[] = [
    { key: 'interviews', label: t('blog.categories.interviews') },
    { key: 'career', label: t('blog.categories.career') },
    { key: 'international', label: t('blog.categories.international') },
    { key: 'technical', label: t('blog.categories.technical') },
  ];

  const filteredPosts = selectedCategory
    ? blogPosts.filter((post) => post.category === selectedCategory)
    : blogPosts;

  const getPostTitle = (post: BlogPost) =>
    currentLanguage === 'pt' ? post.titlePt : post.title;

  const getPostExcerpt = (post: BlogPost) =>
    currentLanguage === 'pt' ? post.excerptPt : post.excerpt;

  const getPostTags = (post: BlogPost) =>
    currentLanguage === 'pt' ? post.tagsPt : post.tags;

  return (
    <section id="blog" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('blog.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-background rounded-xl border border-border p-6 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Header */}
              <div className="space-y-3 mb-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {getPostTitle(post)}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {getPostExcerpt(post)}
                </p>
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(
                      currentLanguage === 'pt' ? 'pt-BR' : 'en-US',
                      { year: 'numeric', month: 'short', day: 'numeric' }
                    )}
                  </time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4 flex-grow">
                {getPostTags(post).slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More Link */}
              <a
                href={`#blog/${post.slug}`}
                className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all"
              >
                {t('blog.readMore')}
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
