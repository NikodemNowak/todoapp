package com.nikodem.todoapp.backend.security

import com.nikodem.todoapp.backend.repositories.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import java.lang.RuntimeException

@Service("userDetailsService")
class UserDetailsServiceImpl(
        private val userRepository: UserRepository
) : UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsernameAndExpiredIsFalse(username) ?: throw RuntimeException("")
        return UserDetailsImpl(user)
    }
}