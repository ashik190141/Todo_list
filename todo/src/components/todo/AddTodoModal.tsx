// import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { addTodo } from "@/redux/features/todoSllce";
// import { useAppDispatch } from "@/redux/hook";
import { FormEvent, useState } from "react";
// import { addTodo } from '@/redux/features/todoSllce';
import { useAddTodoMutation } from "@/redux/api/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddTodoModal = () => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState("");

  // for local state
  // const disPatch = useAppDispatch();

  // for server
  const [addTodo, {data, isLoading, isError, isSuccess }] = useAddTodoMutation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // const randomId = Math.random().toString(36).substring(2, 7);
    const addTodoDetails = {
      priority: priority,
      isCompleted: false,
      task: task,
      description: description
    }
    // disPatch(addTodo(addTodoDetails))
    addTodo(addTodoDetails);
  }
    return (
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary-gradient text-xl font-semibold">
              Add Todo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Your Task</DialogTitle>
              <DialogDescription>
                Add your task that you want to finish
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="task" className="text-right">
                  Task
                </Label>
                <Input
                  id="task"
                  onBlur={(e) => setTask(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  onBlur={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Priority</Label>
                <Select onValueChange={(value) => setPriority(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
};

export default AddTodoModal;