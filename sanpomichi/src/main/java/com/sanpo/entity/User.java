package com.sanpo.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
public class User {
	
	@Id
	String userId;
	
	String userPwd;
	String userName;
	String userFind;
	String userEmail;
	
}

