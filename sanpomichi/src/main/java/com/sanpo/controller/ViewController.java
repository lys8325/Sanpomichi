package com.sanpo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ViewController {
	
	@GetMapping("/")
	public ModelAndView main()
	{
		ModelAndView mv = new ModelAndView();
		mv.setViewName("index");
		
		return mv;
	}

	@GetMapping("/map")
	public ModelAndView map()
	{
		ModelAndView mv = new ModelAndView();
		mv.setViewName("create_map");
		
		return mv;
	}
	
	@GetMapping("/load_map")
	public ModelAndView loadMap()
	{
		ModelAndView mv = new ModelAndView();
		mv.setViewName("load_map");
		
		return mv;
	}
	
	@GetMapping("/login")
	public ModelAndView login()
	{
		ModelAndView mv = new ModelAndView();
		mv.setViewName("login");
		return mv;
	}
}
