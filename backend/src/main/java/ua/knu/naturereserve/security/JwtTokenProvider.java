package ua.knu.naturereserve.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtTokenProvider {
  private final JwtProperty jwtProperty;

  public String generateToken(String subject) {
    Date now = new Date();
    return Jwts.builder()
        .setSubject(subject)
        .setIssuedAt(now)
        .signWith(SignatureAlgorithm.HS512, jwtProperty.getJwtSecret())
        .compact();
  }

  public String getSubject(String token) {
    return Jwts.parser()
        .setSigningKey(jwtProperty.getJwtSecret())
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
  }

  public boolean isValid(String token) {
    try {
      Jwts.parser().setSigningKey(jwtProperty.getJwtSecret()).parseClaimsJws(token);
      return true;
    } catch (JwtException ex) {
      log.error("Invalid JWT token");
    }
    return false;
  }
}
