package com.nikodem.todoapp.backend.repositories

import com.nikodem.todoapp.backend.entity.Task
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskRepository : JpaRepository<Task, Long> {
    fun findByIdAndExpiredIsFalse(taskId: Long): Task?
    fun findAllByExpiredIsFalse(): List<Task>
}