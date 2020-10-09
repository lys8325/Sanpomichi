package com.sanpo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sanpo.entity.Post;

public interface PostRepository extends JpaRepository<Post, String> {
	
	@Query(value = "select * from post where user_id = :user_id", nativeQuery = true)
	 List<Post> findByUserId(@Param("user_id") String userId);

}
