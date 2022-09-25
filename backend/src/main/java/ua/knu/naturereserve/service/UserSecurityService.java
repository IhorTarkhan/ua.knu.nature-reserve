package ua.knu.naturereserve.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.entity.Admin;

@Service
public class UserSecurityService {
  public Admin getCurrentAdmin() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return (Admin) principal;
  }

  //	public Client getCurrentClient() {
  //		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  //		return (Client) principal;
  //	}
}
