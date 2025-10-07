'use client';

import React, { useState } from 'react';
import { Background } from '@/components/layout/Background';
import { SpecTraceability } from '@/components/docs/SpecTraceability';
import { DevelopmentRoadmap } from '@/components/docs/DevelopmentRoadmap';
import { TechSpecs } from '@/components/docs/TechSpecs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '@/components/animations/FadeIn';
import { 
  FileText, 
  GitBranch, 
  Package, 
  ArrowLeft,
  Book,
  Code,
  Target
} from 'lucide-react';
import Link from 'next/link';

type DocumentationSection = 'traceability' | 'roadmap' | 'tech-specs';

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState<DocumentationSection>('traceability');

  const sections = [
    {
      id: 'traceability' as DocumentationSection,
      title: 'Trazabilidad Spec-to-Code',
      description: 'Conexión entre especificaciones y implementación',
      icon: <FileText className="h-6 w-6" />,
      component: <SpecTraceability />
    },
    {
      id: 'roadmap' as DocumentationSection,
      title: 'Roadmap de Desarrollo',
      description: 'Progreso del proyecto y fases completadas',
      icon: <GitBranch className="h-6 w-6" />,
      component: <DevelopmentRoadmap />
    },
    {
      id: 'tech-specs' as DocumentationSection,
      title: 'Especificaciones Técnicas',
      description: 'Stack tecnológico y arquitectura',
      icon: <Package className="h-6 w-6" />,
      component: <TechSpecs />
    }
  ];

  return (
    <Background variant="hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <FadeIn delay={0.1}>
          <div className="mb-8">
            <Link href="/">
              <Button 
                variant="outline" 
                size="sm" 
                className="mb-4 border-white/30 text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a la Aplicación
              </Button>
            </Link>
            
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center">
                <Book className="h-10 w-10 mr-3" />
                Documentación del Proyecto
              </h1>
              <p className="text-blue-200 text-lg">
                Demostración de Spec-Driven Development
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Navigation */}
        <FadeIn delay={0.2}>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 ${
                      activeSection === section.id
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'border-white/30 text-white hover:bg-white/10'
                    }`}
                  >
                    {section.icon}
                    <span>{section.title}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Section Description */}
        <FadeIn delay={0.3}>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  {sections.find(s => s.id === activeSection)?.icon}
                  <h2 className="text-2xl font-bold text-white">
                    {sections.find(s => s.id === activeSection)?.title}
                  </h2>
                </div>
                <p className="text-blue-200 text-lg">
                  {sections.find(s => s.id === activeSection)?.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Active Section Content */}
        <FadeIn delay={0.4}>
          <div className="min-h-[600px]">
            {sections.find(s => s.id === activeSection)?.component}
          </div>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={0.5}>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-8">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-white">
                  ¿Qué es Spec-Driven Development?
                </h3>
                <p className="text-blue-200 max-w-4xl mx-auto">
                  Es una metodología de desarrollo que prioriza la documentación y especificación 
                  detallada antes de la implementación. Este proyecto demuestra cómo las 
                  especificaciones en markdown se traducen directamente en código funcional, 
                  manteniendo trazabilidad completa entre requisitos e implementación.
                </p>
                <div className="flex items-center justify-center space-x-6 text-blue-200">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Especificaciones claras</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4" />
                    <span>Código implementado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>Trazabilidad completa</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </Background>
  );
}
