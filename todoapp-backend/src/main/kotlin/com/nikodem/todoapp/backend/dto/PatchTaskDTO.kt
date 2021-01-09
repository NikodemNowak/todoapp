package com.nikodem.todoapp.backend.dto

import java.time.LocalDateTime

data class PatchTaskDTO(
     val id: Long,
     val name: String,
     val description: String,
     val deadline: LocalDateTime,
     var completed: Boolean,
     var endDate: LocalDateTime? = null,
     var status: String
)