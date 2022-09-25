package ua.knu.naturereserve.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.entity.Admin;
import ua.knu.naturereserve.entity.Manager;
import ua.knu.naturereserve.entity.Operator;

@Service
public class SecurityService {
  public Admin getCurrentAdmin() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return (Admin) principal;
  }

  public Manager getCurrentManager() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return (Manager) principal;
  }

  public Operator getCurrentOperator() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return (Operator) principal;
  }
}
