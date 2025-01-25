"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Paperclip, Pencil, Trash } from "lucide-react"
import { useTaskContext, type Task } from "@/contexts/TaskContext"

interface TaskCardProps extends Task {}

export function TaskCard({ id, title, description, status, labels, assignees, comments, attachments }: TaskCardProps) {
  const { editTask, deleteTask } = useTaskContext()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedDescription, setEditedDescription] = useState(description)

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault()
    editTask(id, { title: editedTitle, description: editedDescription })
    setIsEditDialogOpen(false)
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(id)
    }
  }

  return (
    <>
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-2">
            {labels.map((label) => (
              <Badge key={label} variant="secondary" className="rounded-full">
                {label}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2 overflow-hidden">
              {assignees.map((assignee, i) => (
                <Avatar key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-background">
                  <AvatarImage src={assignee.image} />
                  <AvatarFallback>{assignee.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span className="text-xs">{comments}</span>
              </div>
              <div className="flex items-center">
                <Paperclip className="h-4 w-4 mr-1" />
                <span className="text-xs">{attachments}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 justify-end space-x-2">
          <Button size="icon" variant="ghost" onClick={() => setIsEditDialogOpen(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleDelete}>
            <Trash className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div>
              <Input
                placeholder="Task Title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Task Description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

