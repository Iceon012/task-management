"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

export interface Task {
  id: string
  title: string
  description: string
  status: "not-started" | "ready" | "in-progress" | "blocked" | "done" | "cancelled"
  labels: string[]
  assignees: Array<{ name: string; image?: string }>
  comments: number
  attachments: number
}

interface Column {
  title: string
  tasks: Task[]
}

interface TaskContextType {
  columns: Column[]
  addTask: (columnTitle: string, task: Omit<Task, "id">) => void
  editTask: (taskId: string, updatedTask: Partial<Task>) => void
  deleteTask: (taskId: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider")
  }
  return context
}

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [columns, setColumns] = useState<Column[]>([
    {
      title: "Not started",
      tasks: [
        {
          id: "1",
          title: "Get feedback",
          description: "Review product and gather feedback from the client",
          status: "not-started",
          labels: ["Not started", "Needs review"],
          assignees: [{ name: "User 1" }, { name: "User 2" }, { name: "User 3" }],
          comments: 2,
          attachments: 1,
        },
        {
          id: "2",
          title: "Training seminar",
          description: "Schedule a training seminar for sales team",
          status: "not-started",
          labels: ["Not started", "Needs review"],
          assignees: [{ name: "User 1" }, { name: "User 2" }, { name: "User 3" }],
          comments: 5,
          attachments: 4,
        },
      ],
    },
    {
      title: "In Progress",
      tasks: [],
    },
    {
      title: "Done",
      tasks: [],
    },
  ])

  const addTask = (columnTitle: string, task: Omit<Task, "id">) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.title === columnTitle
          ? { ...column, tasks: [...column.tasks, { ...task, id: Date.now().toString() }] }
          : column,
      ),
    )
  }

  const editTask = (taskId: string, updatedTask: Partial<Task>) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task)),
      })),
    )
  }

  const deleteTask = (taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      })),
    )
  }

  return <TaskContext.Provider value={{ columns, addTask, editTask, deleteTask }}>{children}</TaskContext.Provider>
}

