package com.sanpo.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sanpo.entity.Route;
import com.sanpo.service.RouteService;

@RestController
public class RouteRestController {
	
	@Autowired
	RouteService routeService;
	
	@PostMapping("/saveLocation")
	public String saveLocation(@RequestBody List<Route> routeList)
	{
		for(Route r : routeList)
		{
			routeService.saveRoute(r);
		}
		return "1";
	}

}
