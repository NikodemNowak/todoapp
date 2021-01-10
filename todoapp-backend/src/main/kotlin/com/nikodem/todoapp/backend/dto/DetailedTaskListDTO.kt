package com.nikodem.todoapp.backend.dto

data class DetailedTaskListDTO(
        val id: Long?,
        val name: String?,
        val goal: String,
        val users: List<UserDTO>,
        val tasks: List<TaskDTO>
)