package com.nikodem.todoapp.backend.service

import com.nikodem.todoapp.backend.dto.PatchUserDTO
import com.nikodem.todoapp.backend.dto.PostUserDTO
import com.nikodem.todoapp.backend.dto.ResetPasswordDTO
import com.nikodem.todoapp.backend.dto.UserDTO
import com.nikodem.todoapp.backend.entity.User
import com.nikodem.todoapp.backend.mapper.UserMapper
import com.nikodem.todoapp.backend.repositories.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.lang.Exception
import java.lang.RuntimeException

interface UserService {
    fun findAllNonExpired(): List<UserDTO>
    fun save(postUserDTO: PostUserDTO): UserDTO
    fun update(patchUserDTO: PatchUserDTO): UserDTO
    fun resetPassword(username: String, resetPasswordDTO: ResetPasswordDTO)
}

@Service
class UserServiceImpl(
        private val userRepository: UserRepository,
        private val userMapper: UserMapper,
        private val passwordEncoder: PasswordEncoder
) : UserService {
    override fun findAllNonExpired(): List<UserDTO> {
        return userRepository.findAllByExpiredIsFalse().toDto()
    }

    override fun save(postUserDTO: PostUserDTO): UserDTO {
        val user = userMapper.toEntity(postUserDTO).apply {
            password = passwordEncoder.encode(password)
        }
        return userRepository.save(user).toDto()
    }

    override fun update(patchUserDTO: PatchUserDTO): UserDTO {
        with(patchUserDTO){
            val user = userRepository.findByIdAndExpiredIsFalse(id) ?: throw Exception("User with id $id not found")

            firstName.apply { user.firstName = this }
            lastName.apply { user.lastName = this }
            username.apply { user.username = this }
            password.apply { user.password = this }
            email.apply { user.email = this }

            return userRepository.save(user).toDto()
        }
    }

    override fun resetPassword(username: String, resetPasswordDTO: ResetPasswordDTO) {
        val user = userRepository.findByUsernameAndExpiredIsFalse(username) ?: throw RuntimeException()
        passwordEncoder.matches(resetPasswordDTO.oldPassword, user.password)
        user.password = passwordEncoder.encode(resetPasswordDTO.newPassword)
        userRepository.save(user)
    }
}

fun User.toDto() = UserDTO(id!!, firstName, lastName, email)
fun List<User>.toDto(): List<UserDTO>{
    return map { it.toDto() }
}