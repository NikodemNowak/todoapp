package com.nikodem.todoapp.backend.dto

import java.time.LocalDateTime
import javax.validation.constraints.NotEmpty

data class PostTaskDTO(
        @field:NotEmpty
        val name: String,
        val description: String,
        val deadline: LocalDateTime,
        val completed: Boolean,
        val endDate: LocalDateTime? = null,
        var status: String
)