package ua.knu.naturereserve.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ua.knu.naturereserve.entity.Admin;
import ua.knu.naturereserve.entity.Manager;
import ua.knu.naturereserve.entity.Operator;
import ua.knu.naturereserve.security.filter.AdminSecurityFilter;
import ua.knu.naturereserve.security.filter.ManagerSecurityFilter;
import ua.knu.naturereserve.security.filter.OperatorSecurityFilter;

import static org.springframework.http.HttpMethod.OPTIONS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true, jsr250Enabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
  private final UserDetailsService userService;
  private final AdminSecurityFilter adminSecurityFilter;
  private final ManagerSecurityFilter managerSecurityFilter;
  private final OperatorSecurityFilter operatorSecurityFilter;

  @Override
  public void configure(AuthenticationManagerBuilder authenticationManagerBuilder)
      throws Exception {
    authenticationManagerBuilder.userDetailsService(userService).passwordEncoder(passwordEncoder());
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        // disable csrf
        .csrf()
        .disable()
        // make stateless
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        // add filters
        .addFilterBefore(adminSecurityFilter, UsernamePasswordAuthenticationFilter.class)
        .addFilterBefore(managerSecurityFilter, UsernamePasswordAuthenticationFilter.class)
        .addFilterBefore(operatorSecurityFilter, UsernamePasswordAuthenticationFilter.class)
        // permit OPTIONS request
        .authorizeRequests()
        .antMatchers(OPTIONS, "/**")
        .permitAll()
        // set access to "ADMIN" role
        .antMatchers("/admin/authorisation/login")
        .permitAll()
        .antMatchers("/admin/**")
        .hasRole(Admin.ROLE)
        // set access to "MANAGER" role
        .antMatchers("/manager/authorisation/login")
        .permitAll()
        .antMatchers("/manager/**")
        .hasRole(Manager.ROLE)
        // set access to "OPERATOR" role
        .antMatchers("/operator/authorisation/login")
        .permitAll()
        .antMatchers("/operator/**")
        .hasRole(Operator.ROLE)
        // permit all left request
        .anyRequest()
        .permitAll();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean(BeanIds.AUTHENTICATION_MANAGER)
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }
}
