package com.nikodem.todoapp.backend.service

import com.nikodem.todoapp.backend.dto.PatchTaskDTO
import com.nikodem.todoapp.backend.dto.PostTaskDTO
import com.nikodem.todoapp.backend.dto.TaskDTO
import com.nikodem.todoapp.backend.entity.Task
import com.nikodem.todoapp.backend.mapper.TaskMapper
import com.nikodem.todoapp.backend.repositories.TaskRepository
import com.nikodem.todoapp.backend.repositories.TaskStatusRepository
import org.springframework.stereotype.Service
import java.lang.RuntimeException

interface TaskService {
    fun findAllNonExpired(): List<TaskDTO>
    fun save(postTaskDTO: PostTaskDTO): TaskDTO
    fun update(patchTaskDTO: PatchTaskDTO): TaskDTO
}

@Service
class TaskServiceImpl(
        private val taskRepository: TaskRepository,
        private val taskMapper: TaskMapper,
        private val taskStatusRepository: TaskStatusRepository
) : TaskService {
    override fun findAllNonExpired(): List<TaskDTO> {
        return taskRepository.findAllByExpiredIsFalse().toDto()
    }

    override fun save(postTaskDTO: PostTaskDTO): TaskDTO {
        return taskRepository.save(taskMapper.toEntity(postTaskDTO)).toDto()
    }

    override fun update(patchTaskDTO: PatchTaskDTO): TaskDTO {
        with(patchTaskDTO) {
            val task = taskRepository.findByIdAndExpiredIsFalse(id) ?: throw RuntimeException("Task with id $id not found")
            val stat = taskStatusRepository.findByNameAndExpiredIsFalse(task.status.name)

            name.apply { task.name = this }
            description.apply { task.description = this }
            deadline.apply { task.deadline = this }
            completed.apply { task.completed = this }
            endDate!!.apply { task.endDate = this }
            stat.apply { task.status = this!! }

            return taskRepository.save(task).toDto()
        }
    }

}

fun Task.toDto() = TaskDTO(id!!, name, description, deadline, completed, endDate, status.name)
fun List<Task>.toDto(): List<TaskDTO> {
    return map { it.toDto() }
}