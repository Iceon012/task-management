"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useTaskContext } from "@/contexts/TaskContext"

interface AddTaskDialogProps {
  isOpen: boolean
  onClose: () => void
  columnTitle: string
}

export function AddTaskDialog({ isOpen, onClose, columnTitle }: AddTaskDialogProps) {
  const { addTask } = useTaskContext()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTask(columnTitle, {
      title,
      description,
      status: "not-started",
      labels: [],
      assignees: [],
      comments: 0,
      attachments: 0,
    })
    setTitle("")
    setDescription("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Add Task</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

