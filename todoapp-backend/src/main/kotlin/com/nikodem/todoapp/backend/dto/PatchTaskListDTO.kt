package com.nikodem.todoapp.backend.dto

data class PatchTaskListDTO(
        val id: Long,
        val name: String,
        val goal: String,
        val tasks: MutableSet<TaskDTO>,
        val users: MutableSet<UserDTO>
)