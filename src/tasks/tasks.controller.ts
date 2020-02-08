import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task_dto';
import { GetTaskFilterDto } from './dto/get-taskFilter.dto';
import { TaskStatusValidationPipe } from './pipes/task-validation-status.pipe';

@Controller('tasks')
export class TasksController {
    constructor( private TasksService: TasksService){}
    @Get()
    getTask(@Query(ValidationPipe) filterDto:GetTaskFilterDto):Task[]{
        if(Object.keys(filterDto).length){
            return this.TasksService.getTasksWithFilter(filterDto);
        }else{
            return this.TasksService.getAllTasks();
        }
      
    }

    //premiere méthode d'utilisation de @Body() pour recupéré le corps de tout 
    //le formulaire @Body() body ce corps du formulaire est contenu dans le body alias
    //deuxième méthode, on peut spécifier l'élément exact du formulaire que l'on souhaite 
    //récupérer @Body('element') element:type_de_l'élément
    @Post()
    @UsePipes(ValidationPipe)
    createTask( @Body() createTaskDto: CreateTaskDTO):Task {
        return this.TasksService.createTask(createTaskDto);
    }
    @Get('/:id')
    getTaskById(@Param('id') id: string):Task{
        return this.TasksService.getTaskById(id);
    }
    @Delete('/:id')
    deleteTaskById(@Param('id') id:string):void{
        this.TasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskById(@Param('id') id:string, @Body('status', TaskStatusValidationPipe ) status: TaskStatus):Task{
        return this.TasksService.updateTaskById(id,status);
    }
}
