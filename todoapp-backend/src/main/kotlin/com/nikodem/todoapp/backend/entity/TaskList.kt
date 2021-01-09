package com.nikodem.todoapp.backend.entity

import javax.persistence.Entity
import javax.persistence.OneToMany

@Entity
data class TaskList(
        var name: String,
        var goal: String,
        @OneToMany var tasks: MutableSet<Task> = mutableSetOf(),
        @OneToMany var users: MutableSet<User> = mutableSetOf()
) : AbstractEntity()