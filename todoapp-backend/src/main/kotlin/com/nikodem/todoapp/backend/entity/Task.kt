package com.nikodem.todoapp.backend.entity

import java.time.LocalDateTime
import javax.persistence.Entity
import javax.persistence.ManyToOne

@Entity
data class Task(
    var name: String,
    var description: String,
    var deadline: LocalDateTime,
    var completed: Boolean,
    var endDate: LocalDateTime,
    @ManyToOne var status: TaskStatus
) : AbstractEntity()