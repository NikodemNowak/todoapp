package com.nikodem.todoapp.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TodoappBackendApplication

fun main(args: Array<String>) {
    runApplication<TodoappBackendApplication>(*args)
}
