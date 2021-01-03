package com.nikodem.todoapp.backend.entity

import javax.persistence.Entity

@Entity
data class User (
    var firstName: String,
    var lastName: String,
    var username: String,
    var password: String,
    var email: String
) : AbstractEntity()