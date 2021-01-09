package com.nikodem.todoapp.backend.repositories

import com.nikodem.todoapp.backend.entity.TaskList
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskListRepository : JpaRepository<TaskList, Long> {
    fun findAllByExpiredIsFalse(): List<TaskList>
    fun findByIdAndExpiredIsFalse(taskId: Long): TaskList?
}