package com.nikodem.todoapp.backend.security

import com.nikodem.todoapp.backend.entity.User
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class UserDetailsImpl(
        private val user: User
) : UserDetails {
    override fun getAuthorities() = emptySet<SimpleGrantedAuthority>()

    override fun getPassword(): String {
        return user.password
    }

    override fun getUsername(): String {
        return user.username
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled() = true
}