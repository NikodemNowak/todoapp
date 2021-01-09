package com.nikodem.todoapp.backend.dto

data class PatchUserDTO(
        val id: Long,
        val firstName: String,
        val lastName: String,
        val username: String,
        val password: String,
        val email: String
)