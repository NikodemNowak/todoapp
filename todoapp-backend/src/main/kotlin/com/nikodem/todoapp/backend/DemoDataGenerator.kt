package com.nikodem.todoapp.backend

import com.nikodem.todoapp.backend.dto.PostUserDTO
import com.nikodem.todoapp.backend.entity.Task
import com.nikodem.todoapp.backend.entity.TaskList
import com.nikodem.todoapp.backend.entity.TaskStatus
import com.nikodem.todoapp.backend.repositories.TaskListRepository
import com.nikodem.todoapp.backend.repositories.TaskRepository
import com.nikodem.todoapp.backend.repositories.TaskStatusRepository
import com.nikodem.todoapp.backend.service.UserService
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class DemoDataGenerator(
        private val userService: UserService,
        private val taskRepository: TaskRepository,
        private val taskListRepository: TaskListRepository,
        private val taskStatusRepository: TaskStatusRepository
) : CommandLineRunner {
    override fun run(vararg args: String?) {
        val toDo = taskStatusRepository.save(TaskStatus("TO_DO"))
        val inProgress = taskStatusRepository.save(TaskStatus("IN_PROGRESS"))
        val done = taskStatusRepository.save(TaskStatus("DONE"))
        val user = userService.save(PostUserDTO("Adam", "Jakistam", "AdamJ", "pass123123", "adamj@gmail.com"))
        val user1 = userService.save(PostUserDTO("Krzysztof", "Ktostam", "KrzysztofK", "pass321321", "krzysztofk@gmail.com"))
        val taskList = taskListRepository.save(TaskList("lista", "ukonczyc liste", mutableSetOf()))
        val taskList1 = taskListRepository.save(TaskList("lista1", "ukonczyc liste", mutableSetOf()))
        val task = taskRepository.save(Task(taskList, "zadanie", "jakis tam opis", LocalDateTime.now(), false, LocalDateTime.now(), toDo))
        val task1 = taskRepository.save(Task(taskList, "zadanie1", "jakis tam opis", LocalDateTime.now(), false, LocalDateTime.now(), inProgress))
        val task2 = taskRepository.save(Task(taskList, "zadanie2", "opis", LocalDateTime.now(), false, LocalDateTime.now(), done))
    }
}