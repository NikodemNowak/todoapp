package com.nikodem.todoapp.backend.controller

import com.nikodem.todoapp.backend.dto.PatchTaskStatusDTO
import com.nikodem.todoapp.backend.dto.PostTaskStatusDTO
import com.nikodem.todoapp.backend.dto.TaskStatusDTO
import com.nikodem.todoapp.backend.service.TaskStatusService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@CrossOrigin
@RestController
@RequestMapping("/api/tasks/statuses")
class TaskStatusController(
        private val taskStatusService: TaskStatusService
) {
    @GetMapping
    fun getTaskStatuses(): ResponseEntity<List<TaskStatusDTO>> {
        return ok(taskStatusService.findAllNonExpired())
    }

    @PostMapping
    fun addTaskStatus(@Valid @RequestBody postTaskStatusDTO: PostTaskStatusDTO): ResponseEntity<TaskStatusDTO> {
        return ResponseEntity(taskStatusService.save(postTaskStatusDTO), HttpStatus.CREATED)
    }

    @PatchMapping
    fun editTaskStatus(patchTaskStatusDTO: PatchTaskStatusDTO): ResponseEntity<TaskStatusDTO> {
        return ResponseEntity(taskStatusService.update(patchTaskStatusDTO), HttpStatus.CREATED)
    }
}