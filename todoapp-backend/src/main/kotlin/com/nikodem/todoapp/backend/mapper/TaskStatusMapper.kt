package com.nikodem.todoapp.backend.mapper

import com.nikodem.todoapp.backend.dto.PostTaskStatusDTO
import com.nikodem.todoapp.backend.entity.Task
import com.nikodem.todoapp.backend.entity.TaskStatus
import org.springframework.stereotype.Component

interface TaskStatusMapper {
    fun toEntity(postTaskStatusDTO: PostTaskStatusDTO): TaskStatus
}

@Component
class TaskStatusMapperImpl: TaskStatusMapper {
    override fun toEntity(postTaskStatusDTO: PostTaskStatusDTO): TaskStatus {
        with(postTaskStatusDTO){
            return TaskStatus(name)
        }
    }
}