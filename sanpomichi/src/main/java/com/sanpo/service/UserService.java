package com.sanpo.service;

import javax.servlet.http.HttpSession;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanpo.entity.User;
import com.sanpo.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepo;

	public String hashing(String plainText) {
		return BCrypt.hashpw(plainText,BCrypt.gensalt());
	}
	
	public boolean checkHashCode(String plainText, String hashCode) {
		return BCrypt.checkpw(plainText, hashCode);
	}
	
	public boolean create(User user)
	{
		System.out.println("+++++++++++++++"+user);
		try {
			user.setUserPwd(hashing(user.getUserPwd()));
			user.setUserFind(hashing(user.getUserFind()));
			userRepo.save(user);
			return true;
		}
		catch(Exception e){
			
			e.printStackTrace();
			return false;
		}
		
	}
	
	public boolean searchId(String userId)
	{
		if(userRepo.findByUserId(userId) != null)
		{
			return true;
		}
		
		return false;
	}
	
	public boolean searchName(String userName)
	{
		if(userRepo.findByUserName(userName) != null)
		{
			return true;
		}
		
		return false;
	}
	
	
	public User searchObj(String userId)
	{
		return userRepo.findByUserId(userId);
	}
	
	public int login(User user)
	{
		System.out.println("----------------"+user);
		if(userRepo.findByUserId2(user.getUserId()) != null)
		{
			User checkUser = userRepo.findByUserId2(user.getUserId());
			System.out.println("----------------"+checkUser);
			if(checkHashCode(user.getUserPwd(),checkUser.getUserPwd()))
			{
				return 1;
			}
			return 2;
		}
		else
		{
			return 3;
		}
	}
	
	public int findPwd(User user)
	{
		System.out.println("----------------"+user);
		if(userRepo.findByUserId2(user.getUserId()) != null)
		{
			User checkUser = userRepo.findByUserId2(user.getUserId());
			System.out.println("----------------"+checkUser);
			if(checkHashCode(user.getUserFind(),checkUser.getUserFind()))
			{
				return 0;
			}
			return 1;
		}
		else
		{
			return 2;
		}
	}
	
	public void changePwd(User user) {
		userRepo.changePwd(user.getUserId(), hashing(user.getUserPwd()));
	}
	
}