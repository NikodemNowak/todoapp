package com.nikodem.todoapp.backend.service

import com.nikodem.todoapp.backend.dto.PatchTaskListDTO
import com.nikodem.todoapp.backend.dto.PostTaskListDTO
import com.nikodem.todoapp.backend.dto.TaskListDTO
import com.nikodem.todoapp.backend.entity.Task
import com.nikodem.todoapp.backend.entity.TaskList
import com.nikodem.todoapp.backend.entity.User
import com.nikodem.todoapp.backend.mapper.TaskListMapper
import com.nikodem.todoapp.backend.repositories.TaskListRepository
import com.nikodem.todoapp.backend.repositories.TaskStatusRepository
import com.nikodem.todoapp.backend.repositories.UserRepository
import org.springframework.stereotype.Service
import java.lang.Exception

interface TaskListService {
    fun findAll(): List<TaskListDTO>
    fun save(postTaskListDTO: PostTaskListDTO): TaskListDTO
    fun update(patchTaskListDTO: PatchTaskListDTO): TaskListDTO
}

@Service
class TaskListServiceImpl(
        private val taskListRepository: TaskListRepository,
        private val taskListMapper: TaskListMapper,
        private val taskStatusRepository: TaskStatusRepository,
        private val userRepository: UserRepository
) : TaskListService {
    override fun findAll(): List<TaskListDTO> {
        return taskListRepository.findAllByExpiredIsFalse().toDto()
    }

    override fun save(postTaskListDTO: PostTaskListDTO): TaskListDTO {
        return taskListRepository.save(taskListMapper.toEntity(postTaskListDTO)).toDto()
    }

    override fun update(patchTaskListDTO: PatchTaskListDTO): TaskListDTO {
        with(patchTaskListDTO) {
            val task = taskListRepository.findByIdAndExpiredIsFalse(id)
                    ?: throw Exception("Task list with id $id not found")

            val taskSet = mutableSetOf<Task>()
            tasks.forEach {
                val stat = taskStatusRepository.findByNameAndExpiredIsFalse(it.status)
                        ?: throw Exception("Status with name ${it.status} not found")
                taskSet.add(Task(it.name, it.description, it.deadline, it.completed, it.endDate!!, stat))
            }

            val userSet = mutableSetOf<User>()
            users.forEach {
                val uzer = userRepository.findByIdAndExpiredIsFalse(it.userId)
                        ?: throw Exception("User with id ${it.userId} not found")
                userSet.add(User(uzer.firstName, uzer.lastName, uzer.username, uzer.password, uzer.email))
            }

            id.apply { task.id = this }
            name.apply { task.name = this }
            goal.apply { task.goal = this }
            taskSet.apply { task.tasks = this }
            userSet.apply { task.users = this }

            return taskListRepository.save(task).toDto()
        }
    }
}

fun TaskList.toDto(): TaskListDTO {
    val user = mutableSetOf<Long>()
    users.forEach {
        user.add(it.id!!)
    }
    val task = mutableSetOf<Long>()
    users.forEach {
        task.add(it.id!!)
    }
    return TaskListDTO(id, name, goal, task, user)
}

fun List<TaskList>.toDto(): List<TaskListDTO> {
    return map { it.toDto() }
}