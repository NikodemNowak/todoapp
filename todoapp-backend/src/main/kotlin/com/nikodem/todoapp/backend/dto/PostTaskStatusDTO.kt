package com.nikodem.todoapp.backend.dto

import javax.validation.constraints.NotEmpty

data class PostTaskStatusDTO(
        @field:NotEmpty
        val name: String
)