package com.ems.ems;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data  //generates getters, setters, equals(), hashCode(), toString(), and a required-args constructor. Because there are no final/@NonNull fields, Lombok effectively gives a no-arg constructor required by JPA.
@Entity  // marks the class as a JPA entity
@Table(name="emp_db") //creating a table in database
public class EmployeeEntity {

    @Id  //it will set the id as a primery key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //the database will generate the primary key value (auto-increment). With IDENTITY the DB handles key generation when inserting rows.
    private Long id;
    private String name;
    private String mobile;
    private String email;

}
