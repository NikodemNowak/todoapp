package com.nikodem.todoapp.backend

import com.nikodem.todoapp.backend.entity.Task
import com.nikodem.todoapp.backend.entity.TaskList
import com.nikodem.todoapp.backend.entity.TaskStatus
import com.nikodem.todoapp.backend.entity.User
import com.nikodem.todoapp.backend.repositories.TaskListRepository
import com.nikodem.todoapp.backend.repositories.TaskRepository
import com.nikodem.todoapp.backend.repositories.TaskStatusRepository
import com.nikodem.todoapp.backend.repositories.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.time.LocalDateTime

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
        val user = userRepository.save(User("Adam", "Jakistam", "AdamJ", "pass123", "adamk@gmail.com"))
        val user1 = userRepository.save(User("Krzysztof", "Ktostam", "KrzysztofK", "pass321", "krzysztofk@gmail.com"))
        val task = taskRepository.save(Task("zadanie", "jakis tam opis", LocalDateTime.now(), false, LocalDateTime.now(), toDo))
        val task1 = taskRepository.save(Task("zadanie1", "jakis tam opis", LocalDateTime.now(), false, LocalDateTime.now(), inProgress))
        val taskList = taskListRepository.save(TaskList("lista", "ukonczyc liste", mutableSetOf(task) , mutableSetOf(user1, user)))
    }
}