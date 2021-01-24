package com.nikodem.todoapp.backend.dto

data class TokenDTO(
        val accessToken: String,
        val refreshToken: String
)