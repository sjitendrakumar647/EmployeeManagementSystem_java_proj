package com.ems.ems;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
 
public class Employee {
    private Long id;
    private String name;
    private String mobile;
    private String email;

}
