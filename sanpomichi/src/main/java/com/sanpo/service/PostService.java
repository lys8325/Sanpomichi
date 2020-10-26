package com.sanpo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanpo.entity.Post;
import com.sanpo.repository.PostRepository;

@Service
public class PostService {
	
	@Autowired
	PostRepository postRepo;
	
	public Integer savePost(Post p)
	{
		postRepo.save(p);
		return p.getId();
	}
	
	public List<Post> searchPost(String kwList)
	{
		return postRepo.findByKeyWord(kwList);
	}

}
