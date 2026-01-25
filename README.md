# International Portfolio

A modern, professional frontend portfolio showcasing Full Stack .NET development skills with international best practices.

## 🎯 Overview

This is a responsive, feature-rich portfolio website built with **React 19**, **TypeScript**, and **Tailwind CSS 4**. It demonstrates technical expertise and is optimized for international job applications.

### Key Features

- ✨ **Modern Design**: Clean, minimalist aesthetic with geometric accents
- 🌍 **Internationalization (i18n)**: Full support for English and Portuguese with language switcher
- 🌓 **Dark Mode**: Complete dark/light theme support with persistent storage
- 📱 **Responsive Design**: Mobile-first approach with full responsiveness
- ♿ **Accessibility**: WCAG compliant with semantic HTML and ARIA labels
- 📊 **SEO Optimized**: Meta tags, structured data, and performance optimization
- 🎨 **Interactive Components**: Smooth animations and micro-interactions
- 📝 **Blog Section**: Technical articles with category filtering
- 📧 **Contact Form**: Fully validated contact form with error handling
- 🚀 **GitHub Pages Ready**: Pre-configured for easy deployment

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with Hooks
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Routing**: Wouter (lightweight client-side routing)
- **Internationalization**: i18next + react-i18next
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **Build Tool**: Vite 7
- **Package Manager**: pnpm

## 📁 Project Structure

```
client/
├── public/
│   ├── images/          # Generated and static images
│   └── index.html       # HTML entry point
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── contexts/        # React Context (Theme)
│   ├── hooks/           # Custom hooks (useTranslation)
│   ├── i18n/            # Internationalization config
│   │   └── locales/     # Translation files (en.json, pt.json)
│   ├── data/            # Static data (blog posts)
│   ├── pages/           # Page components
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles & design tokens
└── package.json         # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or use pnpm directly)
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The development server will be available at `http://localhost:3000`

## 🌐 Internationalization

The portfolio supports English and Portuguese with automatic language detection:

- **EN**: English (default)
- **PT**: Português (Brazilian Portuguese)

### Adding New Languages

1. Create a new translation file in `client/src/i18n/locales/` (e.g., `es.json`)
2. Update `client/src/i18n/config.ts` to include the new language
3. The language switcher will automatically detect and display the new option

## 🎨 Design Philosophy

**Modern Minimalist with Geometric Accents**

- Clean, purposeful whitespace
- Geometric shapes and asymmetric layouts
- Professional color palette: Charcoal (#1a1a1a), Teal (#0ea5e9), Warm Beige (#f5f1e8)
- Smooth micro-interactions and animations
- Typography hierarchy: Playfair Display (headings) + Inter (body)

## 📝 Content Sections

### 1. Hero Section
Professional introduction with call-to-action buttons and animated scroll indicator.

### 2. About Section
Personal introduction, expertise highlights, and downloadable resume link.

### 3. Projects Section
Showcase of featured projects with technologies, descriptions, and links to live demos and GitHub repositories.

### 4. Blog Section
Technical articles with category filtering, reading time estimates, and tags.

### 5. Contact Section
Contact information (email, phone, location) and a validated contact form.

### 6. Footer
Quick navigation links and social media connections.

## 🔧 Customization

### Update Personal Information

Edit the following files to customize content:

- `client/src/i18n/locales/en.json` - English translations
- `client/src/i18n/locales/pt.json` - Portuguese translations
- `client/src/data/blog-posts.ts` - Blog post data
- `client/src/components/ProjectsSection.tsx` - Project listings
- `client/src/components/ContactSection.tsx` - Contact details

### Modify Colors

Edit the CSS variables in `client/src/index.css`:

```css
:root {
  --primary: var(--color-blue-700);
  /* ... other variables ... */
}
```

### Update Images

Replace images in `client/public/images/`:

- `hero-background.png` - Hero section background
- `projects-section-bg.png` - Projects section background
- `blog-section-bg.png` - Blog section background
- `contact-section-bg.png` - Contact section background
- `profile.jpg` - Profile photo

## 🚀 Deployment

### GitHub Pages

This project is pre-configured for GitHub Pages deployment:

1. **Update `package.json`** with your repository information:
   ```json
   "homepage": "https://yourusername.github.io/international-portfolio"
   ```

2. **Install gh-pages**:
   ```bash
   pnpm add -D gh-pages
   ```

3. **Add deploy script** to `package.json`:
   ```json
   "scripts": {
     "deploy": "pnpm build && gh-pages -d dist"
   }
   ```

4. **Deploy**:
   ```bash
   pnpm deploy
   ```

5. **Configure GitHub**:
   - Go to repository Settings → Pages
   - Set source to "Deploy from a branch"
   - Select `gh-pages` branch

### Alternative Hosting

The project can also be deployed to:
- Vercel
- Netlify
- AWS Amplify
- Any static hosting service

Simply build the project and upload the `dist/` folder.

## ✅ Quality Checklist

- [x] Responsive design (mobile-first)
- [x] Dark mode support
- [x] Internationalization (i18n)
- [x] SEO optimized
- [x] Accessibility (WCAG)
- [x] Performance optimized
- [x] Clean code structure
- [x] TypeScript strict mode
- [x] ESLint + Prettier configured
- [x] Contact form validation
- [x] Blog section with filtering

## 📚 Best Practices

### Code Quality

- TypeScript for type safety
- ESLint for code consistency
- Prettier for code formatting
- Semantic HTML for accessibility
- WCAG 2.1 AA compliance

### Performance

- Code splitting with React
- Image optimization
- CSS-in-JS with Tailwind
- Lazy loading for images
- Minimal bundle size

### SEO

- Meta tags for all pages
- Open Graph tags
- Structured data (JSON-LD)
- Semantic HTML
- Fast page load times

## 🤝 Contributing

This is a personal portfolio project. However, feel free to fork and customize it for your own use.

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio.

## 📧 Contact

- Email: everleao@gmail.com
- Phone: +55 11 98142-5347
- Location: São Paulo, Brazil

---

**Built with ❤️ for international opportunities**
