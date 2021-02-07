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
            setExpiration(Date(now.time + (5 * 60000)))
            signWith(SignatureAlgorithm.HS256, SECRET_KEY)
        }.compact()
    }

    fun createRefreshToken(username: String): String {
        val now = Date()

        return Jwts.builder().apply {
            setSubject(username)
            setIssuedAt(now)
            setExpiration(Date(now.time + (60000 * 60 * 24)))
            signWith(SignatureAlgorithm.HS256, SECRET_KEY)
        }.compact()
    }

    fun isTokenValid(token: String): Boolean {
        val claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token)
        return claims.body.expiration.after(Date())
    }

    fun getUsername(token: String): String {
        val claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token)
        return claims.body.subject
    }

    companion object {
        private var SECRET_KEY = "bardzo bezpieczny super costam klucz"
    }

}