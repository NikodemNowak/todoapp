package com.nikodem.todoapp.backend.dto

import javax.validation.constraints.NotEmpty

data class PostTaskListDTO(
        @field:NotEmpty
        val name: String,
        val goal: String,
        val tasks: MutableSet<TaskDTO> = mutableSetOf(),
        val users: MutableSet<UserDTO> = mutableSetOf()
)