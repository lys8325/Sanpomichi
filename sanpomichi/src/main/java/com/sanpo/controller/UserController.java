package com.sanpo.controller;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class UserController {
	
	@GetMapping("/logout")
	public ModelAndView logout(HttpSession session) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("redirect:/login");
		try {
			session.invalidate();
			
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return mv;
	}

}
