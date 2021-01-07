package com.nikodem.todoapp.backend

import com.nikodem.todoapp.backend.entity.TaskStatus
import com.nikodem.todoapp.backend.repositories.TaskListRepository
import com.nikodem.todoapp.backend.repositories.TaskRepository
import com.nikodem.todoapp.backend.repositories.TaskStatusRepository
import com.nikodem.todoapp.backend.repositories.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class DemoDataGenerator(
        private val userRepository: UserRepository,
        private val taskRepository: TaskRepository,
        private val taskListRepository: TaskListRepository,
        private val taskStatusRepository: TaskStatusRepository
) : CommandLineRunner {
    override fun run(vararg args: String?) {
        val toDo = taskStatusRepository.save(TaskStatus("TO_DO"))
        val inProgress = taskStatusRepository.save(TaskStatus("IN_PROGRESS"))
        val done = taskStatusRepository.save(TaskStatus("DONE"))
    }
}