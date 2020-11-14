package com.sanpo.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sanpo.entity.Post;
import com.sanpo.entity.Route;
import com.sanpo.repository.PostRepository;
import com.sanpo.repository.RouteRepository;

@Controller
public class ViewController {
	@Autowired
	PostRepository postRepo;
	@Autowired
	RouteRepository routeRepo;
	
	
	@GetMapping("/")
	public ModelAndView main(HttpSession session, HttpServletResponse response)
	{
		ModelAndView mv = new ModelAndView();
		mv.setViewName("index");
		String user_id = (String) session.getAttribute("userNickName");
		List<Post> list = postRepo.findByUserId(user_id);
		mv.addObject("postList", list);
		List<Post> postListAll = postRepo.findAll();
		mv.addObject("postListAll", postListAll);
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
	public ModelAndView loadMap(@RequestParam("route_id") int route_id)
	{
		ModelAndView mv = new ModelAndView();
		mv.setViewName("load_map");
		Route route = routeRepo.findById(route_id).get();
		Post post = postRepo.findByRouteId(route_id);
		mv.addObject("length",post.getLength());
		mv.addObject("information",post.getInformation());
		mv.addObject("x_list", route.getX());
		mv.addObject("y_list", route.getY());
		mv.addObject("id", route.getId());
		mv.addObject("comment", route.getComment());
		return mv;
	}
	
	@GetMapping("/login")
	public ModelAndView login()
	{
		ModelAndView mv = new ModelAndView();
		mv.setViewName("login");
		return mv;
	}
	
	@GetMapping("/theme")
//	public ModelAndView theme(HttpSession session, HttpServletResponse response)
	public ModelAndView theme()
	{
		ModelAndView mv = new ModelAndView();
		mv.setViewName("theme");
//		String user_id = (String) session.getAttribute("userNickName");
//		List<Post> list = postRepo.findByUserId(user_id);
		List<Post> postList = postRepo.findAll();
		mv.addObject("postList", postList);
//		mv.addObject("postList", list);
		return mv;
	}
	
	@GetMapping("/mypage")
	public ModelAndView mypage()
	{
		ModelAndView mv = new ModelAndView();
		List<Route> route = routeRepo.findAll();
		List<Post> post = postRepo.findAll();
		mv.setViewName("mypage");
		mv.addObject("routeList", route);
		mv.addObject("postList", post);
		return mv;
	}
	
	@GetMapping("/search_result")
	public ModelAndView search()
	{
		ModelAndView mv = new ModelAndView();
		mv.setViewName("search_result");
		return mv;
	}
}
