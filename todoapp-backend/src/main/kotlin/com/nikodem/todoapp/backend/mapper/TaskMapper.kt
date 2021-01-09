package com.nikodem.todoapp.backend.mapper

import com.nikodem.todoapp.backend.dto.PostTaskDTO
import com.nikodem.todoapp.backend.entity.Task
import com.nikodem.todoapp.backend.repositories.TaskStatusRepository
import org.springframework.stereotype.Component
import java.lang.Exception

interface TaskMapper {
    fun toEntity(postTaskDTO: PostTaskDTO): Task
}

@Component
class TaskMapperImpl(
        private val taskStatusRepository: TaskStatusRepository
): TaskMapper {
    override fun toEntity(postTaskDTO: PostTaskDTO): Task {
        with(postTaskDTO){
            val stat = taskStatusRepository.findByNameAndExpiredIsFalse(status)
                    ?: throw Exception("Status with name $status not found")
            return Task(name, description, deadline, false, endDate!!, stat)
        }
    }
}