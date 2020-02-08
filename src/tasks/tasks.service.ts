import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task_dto';
import { GetTaskFilterDto } from './dto/get-taskFilter.dto';
@Injectable()
export class TasksService {
    private tasks:Task[] = [];
    getAllTasks():Task[]{
        return this.tasks;
    }

    getTasksWithFilter(filterDto:GetTaskFilterDto):Task[]{
        const {status , search}=filterDto;
        let tasks = this.getAllTasks();

        if(status){
            tasks =  tasks.filter(task => task.status===status)
        }

        if(search){
            tasks =  tasks.filter(
                task => task.title.includes(search) || task.description.includes(search)
                )
        }
        return tasks; 
    }

    //function to create new task
    createTask(createTaskDto:CreateTaskDTO):Task{
        let {title,description}=createTaskDto;
        const task:Task ={
            id: uuid(),
            title,
            description,
            status:TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }
    //function qui retourne un Task à partir de son id
    getTaskById(id:string):Task{
        const found= this.tasks.find(task=> task.id===id);

        if(!found){
            //nest not found exection 
            throw new NotFoundException(`Task with ${id} not found`);
        }

        return found;
    }

    //delete task by id service
    deleteTaskById(id:string):void{
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id!==found.id);
    }

    //updating task by id service
    updateTaskById(id:string,status:TaskStatus):Task{
        let task = this.getTaskById(id);
        task.status = status
        return task;
    }
}
