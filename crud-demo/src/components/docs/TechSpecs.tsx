'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Code, 
  Database, 
  Palette, 
  Zap,
  Globe,
  Shield,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

interface TechStackItem {
  category: string;
  icon: React.ReactNode;
  items: {
    name: string;
    version: string;
    description: string;
    purpose: string;
    documentation?: string;
  }[];
}

const techStack: TechStackItem[] = [
  {
    category: 'Frontend Framework',
    icon: <Globe className="h-6 w-6" />,
    items: [
      {
        name: 'Next.js',
        version: '15.5.4',
        description: 'React framework for production',
        purpose: 'SSR, routing, and performance optimization',
        documentation: 'https://nextjs.org/docs'
      },
      {
        name: 'React',
        version: '18.3.1',
        description: 'JavaScript library for building UIs',
        purpose: 'Component-based architecture',
        documentation: 'https://react.dev'
      },
      {
        name: 'TypeScript',
        version: '5.6.3',
        description: 'Typed JavaScript at any scale',
        purpose: 'Type safety and developer experience',
        documentation: 'https://typescriptlang.org'
      }
    ]
  },
  {
    category: 'Styling & UI',
    icon: <Palette className="h-6 w-6" />,
    items: [
      {
        name: 'Tailwind CSS',
        version: '3.4.15',
        description: 'Utility-first CSS framework',
        purpose: 'Rapid UI development',
        documentation: 'https://tailwindcss.com'
      },
      {
        name: 'shadcn/ui',
        version: 'latest',
        description: 'Re-usable components built with Radix UI',
        purpose: 'Accessible component library',
        documentation: 'https://ui.shadcn.com'
      },
      {
        name: 'Framer Motion',
        version: '11.15.0',
        description: 'Production-ready motion library',
        purpose: 'Smooth animations and transitions',
        documentation: 'https://framer.com/motion'
      }
    ]
  },
  {
    category: 'Development Tools',
    icon: <Code className="h-6 w-6" />,
    items: [
      {
        name: 'ESLint',
        version: '9.17.0',
        description: 'JavaScript linter',
        purpose: 'Code quality and consistency',
        documentation: 'https://eslint.org'
      },
      {
        name: 'Prettier',
        version: '3.4.2',
        description: 'Code formatter',
        purpose: 'Consistent code formatting',
        documentation: 'https://prettier.io'
      },
      {
        name: 'PostCSS',
        version: '8.5.0',
        description: 'CSS post-processor',
        purpose: 'CSS transformations',
        documentation: 'https://postcss.org'
      }
    ]
  },
  {
    category: 'Data Management',
    icon: <Database className="h-6 w-6" />,
    items: [
      {
        name: 'localStorage API',
        version: 'native',
        description: 'Browser storage API',
        purpose: 'Client-side data persistence',
        documentation: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'
      },
      {
        name: 'Custom Hooks',
        version: '1.0.0',
        description: 'React custom hooks',
        purpose: 'State management and business logic',
        documentation: 'https://react.dev/learn/reusing-logic-with-custom-hooks'
      }
    ]
  }
];

const projectSpecs = {
  architecture: 'Single Page Application (SPA)',
  buildTool: 'Turbopack (Next.js built-in)',
  packageManager: 'npm',
  deployment: 'Vercel (ready)',
  browserSupport: 'Modern browsers (ES2020+)',
  responsive: 'Mobile-first design',
  accessibility: 'WCAG 2.1 AA compliant',
  performance: 'Lighthouse score 90+ target'
};

export const TechSpecs: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const copyToClipboard = async (text: string, itemName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemName);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Frontend Framework':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'Styling & UI':
        return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30';
      case 'Development Tools':
        return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      case 'Data Management':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn delay={0.1}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Especificaciones Técnicas
          </h2>
          <p className="text-blue-200 text-lg">
            Stack tecnológico y arquitectura del proyecto
          </p>
        </div>
      </FadeIn>

      {/* Project Overview */}
      <FadeIn delay={0.2}>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center">
              Información del Proyecto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(projectSpecs).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <span className="text-blue-200 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="text-white font-medium">{value}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Tech Stack */}
      <FadeIn delay={0.3}>
        <div className="space-y-4">
          {techStack.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + categoryIndex * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleCategory(category.category)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(category.category)}`}>
                        {category.icon}
                      </div>
                      <CardTitle className="text-white">
                        {category.category}
                      </CardTitle>
                    </div>
                    <Button variant="ghost" size="sm" className="text-white">
                      {expandedCategories.includes(category.category) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {expandedCategories.includes(category.category) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {category.items.map((item, itemIndex) => (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.1 }}
                              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-colors"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="text-white font-medium">{item.name}</h4>
                                    <span className="text-blue-300 text-sm bg-blue-900/30 px-2 py-1 rounded">
                                      v{item.version}
                                    </span>
                                  </div>
                                  <p className="text-blue-200 text-sm mb-2">
                                    {item.description}
                                  </p>
                                  <p className="text-gray-300 text-xs">
                                    <strong>Propósito:</strong> {item.purpose}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                  {item.documentation && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => window.open(item.documentation, '_blank')}
                                      className="text-blue-400 hover:text-blue-300"
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(item.name, item.name)}
                                    className="text-green-400 hover:text-green-300"
                                  >
                                    {copiedItem === item.name ? (
                                      <Check className="h-4 w-4" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      {/* Performance Metrics */}
      <FadeIn delay={0.7}>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center">
              Métricas de Rendimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { metric: 'Bundle Size', value: '< 500KB', icon: <Package className="h-5 w-5" /> },
                { metric: 'First Load', value: '< 1.5s', icon: <Zap className="h-5 w-5" /> },
                { metric: 'Animations', value: '60fps', icon: <Palette className="h-5 w-5" /> },
                { metric: 'Accessibility', value: 'WCAG AA', icon: <Shield className="h-5 w-5" /> }
              ].map((metric, index) => (
                <motion.div
                  key={metric.metric}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="text-blue-400 mb-2 flex justify-center">
                    {metric.icon}
                  </div>
                  <div className="text-white font-bold text-lg mb-1">
                    {metric.value}
                  </div>
                  <div className="text-blue-200 text-sm">
                    {metric.metric}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default TechSpecs;
