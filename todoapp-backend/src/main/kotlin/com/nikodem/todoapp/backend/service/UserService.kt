package com.nikodem.todoapp.backend.service

import com.nikodem.todoapp.backend.dto.PatchUserDTO
import com.nikodem.todoapp.backend.dto.PostUserDTO
import com.nikodem.todoapp.backend.dto.UserDTO
import com.nikodem.todoapp.backend.entity.User
import com.nikodem.todoapp.backend.mapper.UserMapper
import com.nikodem.todoapp.backend.repositories.UserRepository
import org.springframework.stereotype.Service
import java.lang.Exception

interface UserService {
    fun findAllNonExpired(): List<UserDTO>
    fun save(postUserDTO: PostUserDTO): UserDTO
    fun update(patchUserDTO: PatchUserDTO): UserDTO
}

@Service
class UserServiceImpl(
        private val userRepository: UserRepository,
        private val userMapper: UserMapper
) : UserService {
    override fun findAllNonExpired(): List<UserDTO> {
        return userRepository.findAllByExpiredIsFalse().toDto()
    }

    override fun save(postUserDTO: PostUserDTO): UserDTO {
        return userRepository.save(userMapper.toEntity(postUserDTO)).toDto()
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
}

fun User.toDto() = UserDTO(id!!, firstName, lastName, email)
fun List<User>.toDto(): List<UserDTO>{
    return map { it.toDto() }
}