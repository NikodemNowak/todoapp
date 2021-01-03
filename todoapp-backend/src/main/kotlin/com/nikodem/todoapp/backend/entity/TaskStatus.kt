package com.nikodem.todoapp.backend.entity

import javax.persistence.Entity

@Entity
data class TaskStatus(
        var name: String
) : AbstractEntity()