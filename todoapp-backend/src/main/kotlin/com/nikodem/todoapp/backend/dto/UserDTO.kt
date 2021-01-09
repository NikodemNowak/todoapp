package com.nikodem.todoapp.backend.dto

data class UserDTO(
        val userId: Long,
        val firstName: String,
        val lastName: String,
        val email: String
)
