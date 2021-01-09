package com.nikodem.todoapp.backend.controller

import com.nikodem.todoapp.backend.dto.PatchUserDTO
import com.nikodem.todoapp.backend.dto.PostUserDTO
import com.nikodem.todoapp.backend.dto.UserDTO
import com.nikodem.todoapp.backend.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@CrossOrigin
@RestController
@RequestMapping("/api/users")
class UserController(
        private val userService: UserService
) {
    @GetMapping
    fun getUsers(): ResponseEntity<List<UserDTO>> {
        return ok(userService.findAllNonExpired())
    }

    @PostMapping
    fun addUser(@Valid @RequestBody postUserDTO: PostUserDTO): ResponseEntity<UserDTO> {
        return ResponseEntity(userService.save(postUserDTO), HttpStatus.CREATED)
    }

    @PatchMapping
    fun editUser(patchUserDTO: PatchUserDTO): ResponseEntity<UserDTO> {
        return ResponseEntity(userService.update(patchUserDTO), HttpStatus.CREATED)
    }
}