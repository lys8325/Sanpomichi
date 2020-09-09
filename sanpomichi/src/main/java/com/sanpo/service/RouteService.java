package com.sanpo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanpo.entity.Route;
import com.sanpo.repository.RouteRepository;

@Service
public class RouteService {
	
	@Autowired
	RouteRepository routeRepo;
	
	public void saveRoute(Route r)
	{
		routeRepo.save(r);
	}

}
