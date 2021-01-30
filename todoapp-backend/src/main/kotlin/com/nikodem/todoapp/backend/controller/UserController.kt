package com.nikodem.todoapp.backend.controller

import com.nikodem.todoapp.backend.dto.*
import com.nikodem.todoapp.backend.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@CrossOrigin
@RestController
@RequestMapping("/api/users")
class UserController(
        private val userService: UserService,

) {
    @GetMapping
    fun getUsers(): ResponseEntity<List<UserDTO>> {
        return ok(userService.findAllNonExpired())
    }

    @GetMapping("/username")
    fun getName(): String {
        return getUsername()!!
    }

    @PostMapping
    fun addUser(@Valid @RequestBody postUserDTO: PostUserDTO): ResponseEntity<UserDTO> {
        return ResponseEntity(userService.save(postUserDTO), HttpStatus.CREATED)
    }

    @PostMapping("/reset-password")
    fun resetPassword(@RequestBody resetPasswordDTO: ResetPasswordDTO): String {
        userService.resetPassword(getUsername()!!, resetPasswordDTO)
        return "Reset password success"
    }

    @PostMapping("/change-data")
    fun changeData(@RequestBody changeDataDTO: ChangeDataDTO): String {
        userService.changeData(getUsername()!!, changeDataDTO)
        return "Change data success"
    }

    @DeleteMapping
    fun deleteUser(): ResponseEntity<String> {
        userService.setUserExpired(getUsername()!!)
        return ResponseEntity("User deleted", HttpStatus.OK)
    }

    private fun getUsername(): String? {
        val principal = SecurityContextHolder.getContext().authentication.principal
        if (principal is UserDetails) {
            return principal.username
        }

        return null;
    }
}