package com.examportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.Repo.RoleRepository;
import com.examportal.Repo.UserRepository;
import com.examportal.config.JwtUtils;
import com.examportal.model.JwtRequest;
import com.examportal.model.JwtResponse;
import com.examportal.service.impl.UserDetailsServiceImpl;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth/")
public class AuthController {
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	private JwtUtils jwtUtils;

	@PostMapping("/login")
	public ResponseEntity<?> generateTokn(@RequestBody JwtRequest loginRequest) throws Exception {
		try {
			authenticate(loginRequest.getUsername(), loginRequest.getPassword());
		} catch (UsernameNotFoundException e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new Exception("User name not found");
		}

		UserDetails userDetails = this.userDetailsService.loadUserByUsername(loginRequest.getUsername());
		String token = this.jwtUtils.generateToken(userDetails);
		return ResponseEntity.ok(new JwtResponse(token));

	}

	private void authenticate(String username, String password) throws Exception {

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			// TODO: handle exception
			throw new Exception("User is disabled" + e.getMessage());
		} catch (BadCredentialsException e) {
			// TODO: handle exception
			throw new Exception("Bad credentail!!" + e.getMessage());
		}
	}
}
