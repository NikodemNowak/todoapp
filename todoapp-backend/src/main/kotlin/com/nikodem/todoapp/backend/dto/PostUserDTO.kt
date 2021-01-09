package com.nikodem.todoapp.backend.dto

import javax.validation.constraints.NotEmpty
import javax.validation.constraints.Pattern

data class PostUserDTO(
        @field:NotEmpty
        val firstName: String,
        val lastName: String,
        val username: String,
        val password: String,

        @field:Pattern(regexp = "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}\$")
        val email: String, // test@gmail.com
)