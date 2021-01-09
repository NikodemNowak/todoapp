package com.nikodem.todoapp.backend.repositories

import com.nikodem.todoapp.backend.dto.UserDTO
import com.nikodem.todoapp.backend.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByIdAndExpiredIsFalse(userId: Long) : User?
    fun findAllByExpiredIsFalse(): List<User>
}