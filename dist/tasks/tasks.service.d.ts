import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task_dto';
import { GetTaskFilterDto } from './dto/get-taskFilter.dto';
export declare class TasksService {
    private tasks;
    getAllTasks(): Task[];
    getTasksWithFilter(filterDto: GetTaskFilterDto): Task[];
    createTask(createTaskDto: CreateTaskDTO): Task;
    getTaskById(id: string): Task;
    deleteTaskById(id: string): void;
    updateTaskById(id: string, status: TaskStatus): Task;
}
