package com.nikodem.todoapp.backend.controller

import com.nikodem.todoapp.backend.dto.PatchTaskDTO
import com.nikodem.todoapp.backend.dto.PostTaskDTO
import com.nikodem.todoapp.backend.dto.TaskDTO
import com.nikodem.todoapp.backend.service.TaskService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.*
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@CrossOrigin
@RestController
@RequestMapping("/api/tasks")
class TaskController(
        private val taskService: TaskService
) {
    @GetMapping
    fun getTasks(): ResponseEntity<List<TaskDTO>> {
        return ok(taskService.findAllNonExpired())
    }

    @PostMapping
    fun addTask(@Valid @RequestBody postTaskDTO: PostTaskDTO): ResponseEntity<TaskDTO> {
        return ResponseEntity(taskService.save(postTaskDTO), HttpStatus.CREATED)
    }

    @PatchMapping
    fun editTask(@RequestBody patchTaskDTO: PatchTaskDTO): ResponseEntity<TaskDTO> {
        return ResponseEntity(taskService.update(patchTaskDTO), HttpStatus.CREATED)
    }

}