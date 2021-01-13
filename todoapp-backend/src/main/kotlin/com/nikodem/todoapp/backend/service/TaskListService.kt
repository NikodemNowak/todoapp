package com.nikodem.todoapp.backend.service

import com.nikodem.todoapp.backend.dto.*
import com.nikodem.todoapp.backend.entity.Task
import com.nikodem.todoapp.backend.entity.TaskList
import com.nikodem.todoapp.backend.entity.User
import com.nikodem.todoapp.backend.mapper.TaskListMapper
import com.nikodem.todoapp.backend.repositories.TaskListRepository
import com.nikodem.todoapp.backend.repositories.TaskStatusRepository
import com.nikodem.todoapp.backend.repositories.UserRepository
import org.springframework.stereotype.Service
import java.lang.Exception
import java.lang.RuntimeException

interface TaskListService {
    fun findAll(): List<TaskListDTO>
    fun save(postTaskListDTO: PostTaskListDTO): TaskListDTO
    fun update(patchTaskListDTO: PatchTaskListDTO): DetailedTaskListDTO
    fun getTaskListById(id: Long): DetailedTaskListDTO
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

    override fun update(patchTaskListDTO: PatchTaskListDTO): DetailedTaskListDTO {
        with(patchTaskListDTO) {
            val task = taskListRepository.findByIdAndExpiredIsFalse(id)
                    ?: throw RuntimeException("Task list with id $id not found")

            id.apply { task.id = this }
            name.apply { task.name = this }
            goal.apply { task.goal = this }

            val tas = mutableSetOf<Task>()
            tasks.forEach {
                val stat = taskStatusRepository.findByNameAndExpiredIsFalse(it.status)
                        ?: throw RuntimeException("Status with name ${it.status} not found")
                tas.add(Task(it.name, it.description, it.deadline,it.completed,it.endDate!!, stat))
            }
            val use = mutableSetOf<User>()
            users.forEach {
                val u = userRepository.findByIdAndExpiredIsFalse(it.userId)
                        ?: throw RuntimeException("User with id ${it.userId} not found")
                use.add(User(u.firstName, u.lastName, u.username, u.password, u.email))
            }

            tas.apply { task.tasks = this }
            use.apply { task.users = this }

            return taskListRepository.save(task).toDetailedDto()
        }
    }

    override fun getTaskListById(id: Long): DetailedTaskListDTO {
        val taskList = taskListRepository.findByIdAndExpiredIsFalse(id) ?: throw RuntimeException()
        return taskList.toDetailedDto()
    }
}


fun TaskList.toDetailedDto(): DetailedTaskListDTO {
    val mappedUsers = this.users.map { user -> UserDTO(user.id!!, user.firstName, user.lastName, user.email) }
    val mappedTasks = this.tasks.map { task -> TaskDTO(task.id!!, task.name, task.description, task.deadline, task.completed, task.endDate, task.status.name) }
    return DetailedTaskListDTO(id, name, goal, mappedUsers, mappedTasks)
}

fun TaskList.toDto(): TaskListDTO {
    val user = mutableSetOf<Long>()
    users.forEach {
        user.add(it.id!!)
    }
    val task = mutableSetOf<Long>()
    tasks.forEach {
        task.add(it.id!!)
    }
    return TaskListDTO(id, name, goal)
}

fun List<TaskList>.toDto(): List<TaskListDTO> {
    return map { it.toDto() }
}
