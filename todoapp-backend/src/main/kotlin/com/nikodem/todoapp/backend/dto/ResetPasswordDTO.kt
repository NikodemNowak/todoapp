package com.nikodem.todoapp.backend.dto

data class ResetPasswordDTO(
        val oldPassword: String,
        val newPassword: String
)