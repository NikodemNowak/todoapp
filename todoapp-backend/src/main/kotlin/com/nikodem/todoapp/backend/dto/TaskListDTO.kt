package com.nikodem.todoapp.backend.dto

data class TaskListDTO(
        val taskListId: Long?,
        val name: String?,
        val goal: String,
        val tasks: MutableSet<Long>,
        val users: MutableSet<Long>
)