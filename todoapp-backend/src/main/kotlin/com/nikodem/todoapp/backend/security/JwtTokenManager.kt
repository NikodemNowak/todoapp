package com.nikodem.todoapp.backend.security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.util.*

@Component
class JwtTokenManager {

    init {
        SECRET_KEY = Base64.getEncoder().encodeToString(SECRET_KEY.toByteArray())
    }

    fun createAccessToken(username: String): String {
        val now = Date()

        return Jwts.builder().apply {
            setSubject(username)
            setIssuedAt(now)
            setExpiration(Date(now + (5 * 60000)))
            signWith(SignatureAlgorithm.HS256, SECRET_KEY)
        }.compact()
    }

    fun createRefreshToken(username: String): String {
        val now = Date()

        return Jwts.builder().apply {
            setSubject(username)
            setIssuedAt(now)
            setExpiration(Date(now + (60000 * 60 * 24)))
            signWith(SignatureAlgorithm.HS256, SECRET_KEY)
        }.compact()
    }

    companion object {
        private var SECRET_KEY = "bardzo bezpieczny super costam klucz"
    }

}