'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Code, 
  CheckCircle, 
  ArrowRight, 
  ChevronDown, 
  ChevronRight,
  Layers,
  Settings,
  Database,
  Palette,
  Zap
} from 'lucide-react';

interface SpecItem {
  id: string;
  title: string;
  description: string;
  specFile: string;
  implementationFiles: string[];
  status: 'completed' | 'in-progress' | 'pending';
  category: 'data-model' | 'ui-components' | 'business-logic' | 'visual-design';
  acceptanceCriteria: string[];
}

const specItems: SpecItem[] = [
  {
    id: 'data-model',
    title: 'Modelo de Datos',
    description: 'Definición de interfaces TypeScript basadas en data-model.md',
    specFile: 'specs/001-estoy-construyendo-un/data-model.md',
    implementationFiles: [
      'src/lib/types.ts',
      'src/lib/storage.ts',
      'src/lib/constants.ts'
    ],
    status: 'completed',
    category: 'data-model',
    acceptanceCriteria: [
      'Interfaces Item, ItemCategory, Priority, ItemStatus definidas',
      'Servicio de almacenamiento con localStorage',
      'Datos de ejemplo según especificación'
    ]
  },
  {
    id: 'crud-operations',
    title: 'Operaciones CRUD',
    description: 'Implementación completa de Create, Read, Update, Delete',
    specFile: 'specs/001-estoy-construyendo-un/spec.md',
    implementationFiles: [
      'src/hooks/useItems.ts',
      'src/components/crud/ItemForm.tsx',
      'src/components/crud/ItemList.tsx',
      'src/components/crud/DeleteDialog.tsx'
    ],
    status: 'completed',
    category: 'business-logic',
    acceptanceCriteria: [
      'Hook useItems con todas las operaciones CRUD',
      'Formularios con validación según especificación',
      'Lista con filtros y ordenamiento',
      'Diálogo de confirmación para eliminación'
    ]
  },
  {
    id: 'ui-components',
    title: 'Componentes de UI',
    description: 'Componentes shadcn/ui personalizados según plan.md',
    specFile: 'specs/001-estoy-construyendo-un/plan.md',
    implementationFiles: [
      'src/components/ui/button.tsx',
      'src/components/ui/card.tsx',
      'src/components/ui/input.tsx',
      'src/components/ui/dialog.tsx',
      'src/components/ui/toast.tsx'
    ],
    status: 'completed',
    category: 'ui-components',
    acceptanceCriteria: [
      'Componentes base de shadcn/ui instalados',
      'Botones con animaciones Framer Motion',
      'Sistema de notificaciones toast',
      'Modales y diálogos responsivos'
    ]
  },
  {
    id: 'visual-design',
    title: 'Diseño Visual',
    description: 'Tema oscuro con gradientes y animaciones según spec.md',
    specFile: 'specs/001-estoy-construyendo-un/spec.md',
    implementationFiles: [
      'src/components/layout/Background.tsx',
      'src/components/animations/FadeIn.tsx',
      'src/app/page.tsx',
      'tailwind.config.js'
    ],
    status: 'completed',
    category: 'visual-design',
    acceptanceCriteria: [
      'Gradientes animados de fondo',
      'Animaciones a 60fps con Framer Motion',
      'Tema oscuro consistente',
      'Micro-interacciones en todos los elementos'
    ]
  },
  {
    id: 'validation',
    title: 'Validación de Formularios',
    description: 'Validación según restricciones del modelo de datos',
    specFile: 'specs/001-estoy-construyendo-un/data-model.md',
    implementationFiles: [
      'src/components/crud/ItemForm.tsx',
      'src/hooks/useItems.ts'
    ],
    status: 'completed',
    category: 'business-logic',
    acceptanceCriteria: [
      'Validación de campos obligatorios',
      'Límites de caracteres (nombre: 100, descripción: 500)',
      'Prevención de nombres duplicados',
      'Mensajes de error user-friendly'
    ]
  }
];

const getCategoryIcon = (category: SpecItem['category']) => {
  switch (category) {
    case 'data-model':
      return <Database className="h-5 w-5" />;
    case 'ui-components':
      return <Layers className="h-5 w-5" />;
    case 'business-logic':
      return <Settings className="h-5 w-5" />;
    case 'visual-design':
      return <Palette className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getCategoryColor = (category: SpecItem['category']) => {
  switch (category) {
    case 'data-model':
      return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
    case 'ui-components':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    case 'business-logic':
      return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
    case 'visual-design':
      return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30';
    default:
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
  }
};

const getStatusIcon = (status: SpecItem['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'in-progress':
      return <Zap className="h-5 w-5 text-orange-600" />;
    case 'pending':
      return <FileText className="h-5 w-5 text-gray-400" />;
  }
};

export const SpecTraceability: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getStats = () => {
    const total = specItems.length;
    const completed = specItems.filter(item => item.status === 'completed').length;
    const inProgress = specItems.filter(item => item.status === 'in-progress').length;
    const pending = specItems.filter(item => item.status === 'pending').length;
    
    return { total, completed, inProgress, pending };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn delay={0.1}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Trazabilidad Spec-to-Code
          </h2>
          <p className="text-blue-200 text-lg">
            Demostración del proceso de Spec-Driven Development
          </p>
        </div>
      </FadeIn>

      {/* Statistics */}
      <FadeIn delay={0.2}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-blue-200 text-sm">Total Especificaciones</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
              <div className="text-blue-200 text-sm">Implementadas</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.inProgress}</div>
              <div className="text-blue-200 text-sm">En Progreso</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-400">{stats.pending}</div>
              <div className="text-blue-200 text-sm">Pendientes</div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* Spec Items */}
      <FadeIn delay={0.3}>
        <div className="space-y-4">
          {specItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleExpanded(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(item.category)}`}>
                        {getCategoryIcon(item.category)}
                      </div>
                      <div>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <span>{item.title}</span>
                          {getStatusIcon(item.status)}
                        </CardTitle>
                        <p className="text-blue-200 text-sm mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-white">
                      {expandedItems.includes(item.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {expandedItems.includes(item.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {/* Spec File */}
                          <div>
                            <h4 className="text-white font-medium mb-2 flex items-center">
                              <FileText className="h-4 w-4 mr-2" />
                              Archivo de Especificación
                            </h4>
                            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                              <code className="text-blue-300 text-sm">{item.specFile}</code>
                            </div>
                          </div>

                          {/* Implementation Files */}
                          <div>
                            <h4 className="text-white font-medium mb-2 flex items-center">
                              <Code className="h-4 w-4 mr-2" />
                              Archivos de Implementación
                            </h4>
                            <div className="space-y-2">
                              {item.implementationFiles.map((file, fileIndex) => (
                                <motion.div
                                  key={fileIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: fileIndex * 0.1 }}
                                  className="bg-gray-800/50 rounded-lg p-3 border border-gray-700 flex items-center justify-between"
                                >
                                  <code className="text-green-300 text-sm">{file}</code>
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Acceptance Criteria */}
                          <div>
                            <h4 className="text-white font-medium mb-2 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Criterios de Aceptación
                            </h4>
                            <div className="space-y-2">
                              {item.acceptanceCriteria.map((criteria, criteriaIndex) => (
                                <motion.div
                                  key={criteriaIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: criteriaIndex * 0.1 }}
                                  className="flex items-start space-x-2"
                                >
                                  <ArrowRight className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-blue-200 text-sm">{criteria}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
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

      {/* Process Overview */}
      <FadeIn delay={0.4}>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center">
              Proceso de Spec-Driven Development
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: '1', title: 'Especificación', desc: 'Definir requerimientos en markdown' },
                { step: '2', title: 'Planificación', desc: 'Crear tareas y dependencias' },
                { step: '3', title: 'Implementación', desc: 'Desarrollar según especificación' },
                { step: '4', title: 'Validación', desc: 'Verificar criterios de aceptación' }
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-white font-medium mb-1">{step.title}</h3>
                  <p className="text-blue-200 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default SpecTraceability;
