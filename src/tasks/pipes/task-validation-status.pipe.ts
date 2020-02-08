import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
    ];

    transform(value:any){
        value = value.toUpperCase();

        if(!this.isStatutValid(value)){
            throw new BadRequestException(`${value} is an invalid status`);
        }
        
        return value;
    }

    private isStatutValid(status:any){
        let idx =  this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}