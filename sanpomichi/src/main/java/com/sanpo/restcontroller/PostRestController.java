package com.sanpo.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sanpo.entity.Post;
import com.sanpo.service.PostService;

@RestController
public class PostRestController {
	
	@Autowired
	PostService postService;
	
	@PostMapping("/savePost")
	public Integer saveLocation(@RequestBody Post p)
	{
		postService.savePost(p);
		return p.getId();
	}

}
