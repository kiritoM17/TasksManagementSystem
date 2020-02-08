import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task_dto';
import { GetTaskFilterDto } from './dto/get-taskFilter.dto';
export declare class TasksController {
    private TasksService;
    constructor(TasksService: TasksService);
    getTask(filterDto: GetTaskFilterDto): Task[];
    createTask(createTaskDto: CreateTaskDTO): Task;
    getTaskById(id: string): Task;
    deleteTaskById(id: string): void;
    updateTaskById(id: string, status: TaskStatus): Task;
}
