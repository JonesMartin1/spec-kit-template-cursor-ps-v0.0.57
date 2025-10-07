'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  Target, 
  GitBranch,
  Code2,
  Palette,
  FileText,
  Zap
} from 'lucide-react';

interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  tasks: number;
  completedTasks: number;
  icon: React.ReactNode;
  color: string;
  dependencies?: string[];
}

const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'setup',
    title: 'Setup del Proyecto',
    description: 'Configuración inicial de Next.js, TypeScript, Tailwind CSS y dependencias',
    status: 'completed',
    tasks: 6,
    completedTasks: 6,
    icon: <Code2 className="h-6 w-6" />,
    color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
  },
  {
    id: 'foundational',
    title: 'Fundamentos',
    description: 'Tipos, servicios de almacenamiento, datos de ejemplo y hooks base',
    status: 'completed',
    tasks: 4,
    completedTasks: 4,
    icon: <GitBranch className="h-6 w-6" />,
    color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
  },
  {
    id: 'mvp',
    title: 'MVP - Operaciones CRUD',
    description: 'Implementación completa de funcionalidad CRUD con validación y manejo de errores',
    status: 'completed',
    tasks: 18,
    completedTasks: 18,
    icon: <CheckCircle className="h-6 w-6" />,
    color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
  },
  {
    id: 'visual',
    title: 'Mejoras Visuales',
    description: 'Tema oscuro, animaciones fluidas y micro-interacciones',
    status: 'completed',
    tasks: 6,
    completedTasks: 6,
    icon: <Palette className="h-6 w-6" />,
    color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
  },
  {
    id: 'documentation',
    title: 'Documentación',
    description: 'Componentes de documentación y trazabilidad spec-to-code',
    status: 'completed',
    tasks: 1,
    completedTasks: 1,
    icon: <FileText className="h-6 w-6" />,
    color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
  },
  {
    id: 'polish',
    title: 'Pulido Final',
    description: 'Optimizaciones de rendimiento, accesibilidad y testing',
    status: 'pending',
    tasks: 5,
    completedTasks: 0,
    icon: <Zap className="h-6 w-6" />,
    color: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30'
  }
];

export const DevelopmentRoadmap: React.FC = () => {
  const getStatusIcon = (status: RoadmapPhase['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-orange-600" />;
      case 'pending':
        return <Target className="h-5 w-5 text-gray-400" />;
    }
  };

  const getProgressPercentage = (phase: RoadmapPhase) => {
    return (phase.completedTasks / phase.tasks) * 100;
  };

  const getOverallProgress = () => {
    const totalTasks = roadmapPhases.reduce((sum, phase) => sum + phase.tasks, 0);
    const completedTasks = roadmapPhases.reduce((sum, phase) => sum + phase.completedTasks, 0);
    return (completedTasks / totalTasks) * 100;
  };

  const overallProgress = getOverallProgress();

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn delay={0.1}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Roadmap de Desarrollo
          </h2>
          <p className="text-blue-200 text-lg">
            Progreso del proyecto siguiendo Spec-Driven Development
          </p>
        </div>
      </FadeIn>

      {/* Overall Progress */}
      <FadeIn delay={0.2}>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center">
              Progreso General del Proyecto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Progreso Total</span>
                <span className="text-white font-bold">{Math.round(overallProgress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {roadmapPhases.filter(p => p.status === 'completed').length}
                  </div>
                  <div className="text-blue-200 text-sm">Fases Completadas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">
                    {roadmapPhases.filter(p => p.status === 'in-progress').length}
                  </div>
                  <div className="text-blue-200 text-sm">En Progreso</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-400">
                    {roadmapPhases.filter(p => p.status === 'pending').length}
                  </div>
                  <div className="text-blue-200 text-sm">Pendientes</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Phase Timeline */}
      <FadeIn delay={0.3}>
        <div className="space-y-4">
          {roadmapPhases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Phase Icon */}
                    <div className={`p-3 rounded-lg ${phase.color}`}>
                      {phase.icon}
                    </div>

                    {/* Phase Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                          <span>{phase.title}</span>
                          {getStatusIcon(phase.status)}
                        </h3>
                        <span className="text-blue-200 text-sm">
                          {phase.completedTasks}/{phase.tasks} tareas
                        </span>
                      </div>

                      <p className="text-blue-200 mb-4">
                        {phase.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white">Progreso de la Fase</span>
                          <span className="text-white font-medium">
                            {Math.round(getProgressPercentage(phase))}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${
                              phase.status === 'completed' 
                                ? 'bg-gradient-to-r from-green-500 to-green-400'
                                : phase.status === 'in-progress'
                                ? 'bg-gradient-to-r from-orange-500 to-orange-400'
                                : 'bg-gradient-to-r from-gray-500 to-gray-400'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${getProgressPercentage(phase)}%` }}
                            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                          />
                        </div>
                      </div>

                      {/* Dependencies */}
                      {phase.dependencies && phase.dependencies.length > 0 && (
                        <div className="mt-4">
                          <span className="text-blue-200 text-sm">Depende de: </span>
                          <span className="text-white text-sm">
                            {phase.dependencies.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      {/* Key Metrics */}
      <FadeIn delay={0.8}>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center">
              Métricas del Proyecto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {roadmapPhases.reduce((sum, phase) => sum + phase.completedTasks, 0)}
                </div>
                <div className="text-blue-200 text-sm">Tareas Completadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {roadmapPhases.reduce((sum, phase) => sum + phase.tasks, 0)}
                </div>
                <div className="text-blue-200 text-sm">Total de Tareas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5</div>
                <div className="text-blue-200 text-sm">User Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-blue-200 text-sm">MVP Completado</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default DevelopmentRoadmap;
