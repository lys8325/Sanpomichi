package com.sanpo.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.vladmihalcea.hibernate.type.json.JsonStringType;

import lombok.Data;

@Entity
@Data
@TypeDef(
		name = "json", 
		typeClass = JsonStringType.class
	)
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
//	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "ROUTE_ID")
	Integer route_id;
	
	@Type(type = "json")
	@Column(columnDefinition = "json")
	String[] keyword;
	
	Integer heart;
	
	String information;
	
	Integer length;

	String user_id;
}
