package com.nikodem.todoapp.backend.mapper

import com.nikodem.todoapp.backend.dto.PostUserDTO
import com.nikodem.todoapp.backend.entity.User
import org.springframework.stereotype.Component

interface UserMapper {
    fun toEntity(postUserDTO: PostUserDTO): User
}

@Component
class UserMapperImpl : UserMapper {
    override fun toEntity(postUserDTO: PostUserDTO): User {
        with(postUserDTO) {
            return User(firstName, lastName, username, password, email)
        }
    }
}