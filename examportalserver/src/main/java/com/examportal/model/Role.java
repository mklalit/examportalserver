package com.examportal.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "roles")
public class Role {

	@Id
	private Long roleId;
	private String roleName;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "role")
	@JsonIgnore
	private Set<UserRole> userRole = new HashSet<UserRole>();

	public Role() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public Role(Long roleId, String roleName, Set<UserRole> userRole) {
		super();
		this.roleId = roleId;
		this.roleName = roleName;
		this.userRole = userRole;
	}

	public Set<UserRole> getUserRole() {
		return userRole;
	}

	public void setUserRole(Set<UserRole> userRole) {
		this.userRole = userRole;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
}
