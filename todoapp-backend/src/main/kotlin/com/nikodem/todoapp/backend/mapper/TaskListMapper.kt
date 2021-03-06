package com.nikodem.todoapp.backend.mapper

import com.nikodem.todoapp.backend.dto.PostTaskListDTO
import com.nikodem.todoapp.backend.entity.Task
import com.nikodem.todoapp.backend.entity.TaskList
import com.nikodem.todoapp.backend.entity.User
import com.nikodem.todoapp.backend.repositories.TaskRepository
import com.nikodem.todoapp.backend.repositories.UserRepository
import org.springframework.stereotype.Component
import java.lang.Exception

interface TaskListMapper {
    fun toEntity(postTaskListDTO: PostTaskListDTO): TaskList
}

@Component
class TaskListMapperImpl(
        private val userRepository: UserRepository,
        private val taskRepository: TaskRepository
) : TaskListMapper {
    override fun toEntity(postTaskListDTO: PostTaskListDTO): TaskList {
        with(postTaskListDTO) {
            val taskList = TaskList(name, goal)

            tasks.forEach {
                val task = taskRepository.findByIdAndExpiredIsFalse(it.id)
                        ?: throw Exception("Task with id ${it.id} not found")

                taskList.tasks.add(Task(
                        task.taskList,
                        task.name,
                        task.description,
                        task.deadline,
                        task.completed,
                        task.endDate,
                        task.status))
            }

            users.forEach {
                val user = userRepository.findByIdAndExpiredIsFalse(it.userId)
                        ?: throw Exception("User with id ${it.userId} not found")

                taskList.users.add(User(user.firstName,
                        user.lastName,
                        user.username,
                        user.password,
                        user.email))
            }

            println(taskList)

            return taskList
        }
    }
}