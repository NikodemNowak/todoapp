package com.nikodem.todoapp.backend.controller

import com.nikodem.todoapp.backend.dto.DetailedTaskListDTO
import com.nikodem.todoapp.backend.dto.PatchTaskListDTO
import com.nikodem.todoapp.backend.dto.PostTaskListDTO
import com.nikodem.todoapp.backend.dto.TaskListDTO
import com.nikodem.todoapp.backend.service.TaskListService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@CrossOrigin
@RestController
@RequestMapping("/api/tasks/lists")
class TaskListController(
        private val taskListService: TaskListService
) {
    @GetMapping
    fun getTaskLists(): ResponseEntity<List<TaskListDTO>>{
        return ok(taskListService.findAll())
    }

    @GetMapping("/{id}")
    fun getTaskList(@PathVariable id: Long): ResponseEntity<DetailedTaskListDTO>{
        return ok(taskListService.getTaskListById(id))
    }

    @PostMapping
    fun addTaskList(@Valid @RequestBody postTaskListDTO: PostTaskListDTO): ResponseEntity<TaskListDTO> {
        return ResponseEntity(taskListService.save(postTaskListDTO), HttpStatus.CREATED)
    }

    @PatchMapping
    fun editTaskList(patchTaskListDTO: PatchTaskListDTO): ResponseEntity<TaskListDTO> {
        return ResponseEntity(taskListService.update(patchTaskListDTO), HttpStatus.CREATED)
    }
}