package ua.knu.naturereserve.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.exception.NotFoundException;
import ua.knu.naturereserve.repository.AdminRepository;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AllUsersRoleDetailsService implements UserDetailsService {
  private final AdminRepository adminRepository;
  // private final ClientRepository clientRepository;

  @Override
  public UserDetails loadUserByUsername(String username) {
    Optional<? extends UserDetails> admin = adminRepository.findByEmail(username);
    if (admin.isPresent()) {
      return admin.get();
    }
    // Optional<? extends UserDetails> client = clientRepository.findByEmail(username);
    // if (client.isPresent()) {
    //  return client.get();
    // }
    throw new NotFoundException("No user with email " + username);
  }
}
