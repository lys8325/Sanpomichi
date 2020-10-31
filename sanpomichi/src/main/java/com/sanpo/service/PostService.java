package com.sanpo.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

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
	
	public List<Integer> searchPost(List<String> kwList)
	{ 
		// 반복문을 돌 때마다 얻은 리스트의 post 객체들의 수를 기록하는 map.
		Map<Integer, Integer> map = new HashMap<Integer, Integer>();
		// 검색 요청한 키워드 마다 keyword, information 을 탐색하고 최종적으로 많이 나타난 순으로 정렬하여 결과를 반환.
		// 이를 활용해 더욱 일치하는 post를 상위에 띄울 수 있음. 현재는 post_id 만을 반환하지만 후에 post를 담도록 수정 예정.
		List<Integer> res = new ArrayList<Integer>();
		
		// keyword 검색
		for(String s : kwList) {
			List<Post> postList = postRepo.findByKeyWord("\""+s+"\"");
			for(Post p : postList) {
				int pid = p.getId();
				if(map.containsKey(pid)){
					int tmp = map.get(pid);
					map.replace(pid, tmp+1);
				}else {
					map.put(pid, 1);
				}
			}
		}
		
		// information 검색
		for(String s : kwList) {
			List<Post> postList = postRepo.findByInformation(s);
			for(Post p : postList) {
				int pid = p.getId();
				if(map.containsKey(pid)){
					int tmp = map.get(pid);
					map.replace(pid, tmp+1);
				}else {
					map.put(pid, 1);
				}
			}
		}
		
		List<Entry<Integer, Integer>> list_entries = new ArrayList<Entry<Integer, Integer>>(map.entrySet());

		// 비교함수 Comparator를 사용하여 내림 차순으로 정렬
		Collections.sort(list_entries, new Comparator<Entry<Integer, Integer>>() {
			// compare로 값을 비교
			public int compare(Entry<Integer, Integer> obj1, Entry<Integer, Integer> obj2)
			{
				// 내림 차순으로 정렬
				return obj2.getValue().compareTo(obj1.getValue());
			}
		});

		// 결과 담기
		for(Entry<Integer, Integer> entry : list_entries) {
			res.add(entry.getKey());
		}
		
		return res;
	}

}
