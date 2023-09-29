package com.examportal.service;

import java.util.Set;

import com.examportal.model.User;
import com.examportal.model.UserRole;

public interface UserService {

	// creating user
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;

	// get user by name
	public User getUser(String username);

	// delete user
	public void deleteUser(Long userId);
}
