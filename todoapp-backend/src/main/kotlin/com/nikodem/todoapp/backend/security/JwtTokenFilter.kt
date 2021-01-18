package com.nikodem.todoapp.backend.security

import org.springframework.web.filter.GenericFilterBean
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse

class JwtTokenFilter : GenericFilterBean() {
    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        println("filtrowanie requestu")
        chain?.doFilter(request, response)
    }
}