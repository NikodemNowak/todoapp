package com.nikodem.todoapp.backend.repositories

import com.nikodem.todoapp.backend.entity.TaskStatus
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskStatusRepository : JpaRepository<TaskStatus, Long> {
    fun findByNameAndExpiredIsFalse(name: String): TaskStatus?
    fun findAllByExpiredIsFalse(): List<TaskStatus>
}