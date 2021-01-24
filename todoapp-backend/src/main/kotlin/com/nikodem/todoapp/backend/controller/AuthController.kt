package com.nikodem.todoapp.backend.controller

import com.nikodem.todoapp.backend.dto.LoginDTO
import com.nikodem.todoapp.backend.dto.TokenDTO
import com.nikodem.todoapp.backend.security.JwtTokenManager
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
@RequestMapping("/api/login")
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val jwtTokenManager: JwtTokenManager
) {
    @PostMapping
    fun loginUser(@RequestBody user: LoginDTO): TokenDTO {
        val authToken = UsernamePasswordAuthenticationToken(user.username, user.password)
        authenticationManager.authenticate(authToken)

        return TokenDTO(
                jwtTokenManager.createAccessToken(user.username),
                jwtTokenManager.createRefreshToken(user.username)
        )
    }
}