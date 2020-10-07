package com.sanpo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
	
	String name;
	
	@Type(type = "json")
	@Column(columnDefinition = "json")
	String[] keyword;
	
	Integer heart;

}
