package com.nikodem.todoapp.backend.security

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.web.filter.GenericFilterBean
import java.lang.RuntimeException
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest

class JwtTokenFilter(
        private val jwtTokenManager: JwtTokenManager,
        private val userDetailsService: UserDetailsService
) : GenericFilterBean() {
    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        val servletRequest = request as HttpServletRequest
        val header = servletRequest.getHeader("Authorization")

        if (header != null) {
            val token = header.substring("Bearer ".length)
            if (jwtTokenManager.isTokenValid(token)){
                val username = jwtTokenManager.getUsername(token)
                val userDetails = userDetailsService.loadUserByUsername(username)
                if (userDetails.isEnabled && userDetails.isAccountNonLocked) {
                    val authToken = UsernamePasswordAuthenticationToken(userDetails, "", userDetails.authorities)
                    SecurityContextHolder.getContext().authentication = authToken
                }
            } else {
                throw RuntimeException("Token is expired")
            }
        }

        chain?.doFilter(request, response)
    }
}