package ua.knu.naturereserve.security.filter;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import ua.knu.naturereserve.security.JwtTokenProvider;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

public abstract class AbstractSecurityFilter extends OncePerRequestFilter {
  private final JpaRepository<? extends UserDetails, Long> userRepository;
  private final JwtTokenProvider jwtTokenProvider;
  private final String header;

  AbstractSecurityFilter(
      JpaRepository<? extends UserDetails, Long> userRepository,
      JwtTokenProvider jwtTokenProvider,
      String header) {
    this.userRepository = userRepository;
    this.jwtTokenProvider = jwtTokenProvider;
    this.header = header;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    getJwtFromRequest(request)
        .flatMap(this::getAuthUserFromToken)
        .ifPresent(user -> setContext(request, user));
    filterChain.doFilter(request, response);
  }

  private Optional<String> getJwtFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader(header);
    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return Optional.of(bearerToken.substring(7));
    }
    return Optional.empty();
  }

  private Optional<? extends UserDetails> getAuthUserFromToken(String jwt) {
    if (jwtTokenProvider.isValid(jwt)) {
      Long id = Long.valueOf(jwtTokenProvider.getSubject(jwt));
      return userRepository.findById(id);
    }
    return Optional.empty();
  }

  private void setContext(HttpServletRequest request, UserDetails userDetails) {
    UsernamePasswordAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(authentication);
  }
}
