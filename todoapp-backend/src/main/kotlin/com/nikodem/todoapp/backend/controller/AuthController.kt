package com.nikodem.todoapp.backend.controller

import com.nikodem.todoapp.backend.dto.*
import com.nikodem.todoapp.backend.security.JwtTokenManager
import io.swagger.annotations.Api
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.*

@RestController
class AuthController(
        private val authenticationManager: AuthenticationManager,
        private val jwtTokenManager: JwtTokenManager
) {
    @CrossOrigin
    @PostMapping("/api/login")
    fun loginUser(@RequestBody user: LoginDTO): TokenDTO {
        val authToken = UsernamePasswordAuthenticationToken(user.username, user.password)
        authenticationManager.authenticate(authToken)

        return TokenDTO(
                jwtTokenManager.createAccessToken(user.username),
                jwtTokenManager.createRefreshToken(user.username)
        )
    }

    @CrossOrigin
    @PostMapping("/api/token/verify")
    fun verifyToken(@RequestBody token: VerifyTokenDTO): ResponseEntity<ApiInfo> {
        return if (jwtTokenManager.isTokenValid(token.accessToken)) {
            ResponseEntity.ok(ApiInfo("Token is valid"))
        } else {
            ResponseEntity(ApiInfo("Token is not valid"), HttpStatus.UNAUTHORIZED)
        }
    }

    @CrossOrigin
    @PostMapping("/api/token/refresh")
    fun refresh(@RequestBody token: RefreshTokenDTO): ResponseEntity<Any> {
        return if (jwtTokenManager.isTokenValid(token.refreshToken)) {
            ResponseEntity.ok(AccessTokenDTO(jwtTokenManager.createAccessToken(jwtTokenManager.getUsername(token.refreshToken))))
        } else {
            ResponseEntity(ApiInfo("Token is not valid"), HttpStatus.UNAUTHORIZED)
        }
    }
}