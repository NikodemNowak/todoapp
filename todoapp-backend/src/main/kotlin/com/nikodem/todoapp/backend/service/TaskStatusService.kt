package com.nikodem.todoapp.backend.service

import com.nikodem.todoapp.backend.dto.PatchTaskStatusDTO
import com.nikodem.todoapp.backend.dto.PostTaskStatusDTO
import com.nikodem.todoapp.backend.dto.TaskStatusDTO
import com.nikodem.todoapp.backend.entity.TaskStatus
import com.nikodem.todoapp.backend.mapper.TaskStatusMapper
import com.nikodem.todoapp.backend.repositories.TaskStatusRepository
import org.springframework.stereotype.Service
import java.lang.Exception

interface TaskStatusService {
    fun findAllNonExpired(): List<TaskStatusDTO>
    fun save(postTaskStatusDTO: PostTaskStatusDTO): TaskStatusDTO
    fun update(patchTaskStatusDTO: PatchTaskStatusDTO): TaskStatusDTO
}

@Service
class TaskStatusServiceImpl(
        private val taskStatusRepository: TaskStatusRepository,
        private val taskStatusMapper: TaskStatusMapper
):TaskStatusService {
    override fun findAllNonExpired(): List<TaskStatusDTO> {
        return taskStatusRepository.findAllByExpiredIsFalse().toDto()
    }

    override fun save(postTaskStatusDTO: PostTaskStatusDTO): TaskStatusDTO {
        return taskStatusRepository.save(taskStatusMapper.toEntity(postTaskStatusDTO)).toDto()
    }

    override fun update(patchTaskStatusDTO: PatchTaskStatusDTO): TaskStatusDTO {
        with(patchTaskStatusDTO){
            val taskStatus = taskStatusRepository.findByNameAndExpiredIsFalse(name) ?: throw Exception("Task status with name $name not found")

            name.apply { taskStatus.name = this}

            return taskStatusRepository.save(taskStatus).toDto()
        }
    }
}

fun TaskStatus.toDto() = TaskStatusDTO(id, name)
fun List<TaskStatus>.toDto(): List<TaskStatusDTO> {
    return map { it.toDto() }
}