"use client";

import { AddTaskDialog } from '@/components/add-task-dialog';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { TaskCard } from '@/components/task-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTaskContext } from '@/contexts/TaskContext';
import { Plus, Search, Star } from 'lucide-react';
import React, { useState } from 'react';

const DashboardPage: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { columns } = useTaskContext()
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
    const [selectedColumn, setSelectedColumn] = useState("")
  
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-semibold">All sprints</h1>
                <Star className="h-5 w-5" />
              </div>
              <Button>Complete sprint</Button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search" />
              </div>
              <div className="flex -space-x-2 overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Avatar key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
              {columns.map((column) => (
                <div key={column.title} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="font-medium">{column.title}</h2>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedColumn(column.title)
                        setIsAddTaskOpen(true)
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {column.tasks.map((task) => (
                    <TaskCard key={task.id} {...task} />
                  ))}
                </div>
              ))}
            </div>
          </main>
        </div>
        <AddTaskDialog isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} columnTitle={selectedColumn} />
      </div>
    )
};

export default DashboardPage;