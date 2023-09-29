package com.examportal.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examportal.Repo.RoleRepository;
import com.examportal.Repo.UserRepository;
import com.examportal.model.User;
import com.examportal.model.UserRole;
import com.examportal.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		User local = this.userRepository.findByUsername(user.getUsername());
		if (local != null) {
			System.out.println("user already exits");
			throw new Exception("user already exits");
		} else {
			for (UserRole ur : userRoles) {
				roleRepository.save(ur.getRole());
			}

			user.getUserRole().addAll(userRoles);

			local = this.userRepository.save(user);
		}
		return local;
	}

	@Override
	public User getUser(String username) {
		// TODO Auto-generated method stub
		return this.userRepository.findByUsername(username);
	}

	@Override
	public void deleteUser(Long userId) {
		// TODO Auto-generated method stub
		this.userRepository.deleteById(userId);
	}

}
