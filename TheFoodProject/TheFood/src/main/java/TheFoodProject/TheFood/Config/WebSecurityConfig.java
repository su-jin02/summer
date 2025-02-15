package TheFoodProject.TheFood.Config;

import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private DataSource dataSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
          http.csrf().disable();
//                .authorizeRequests()
//                    .antMatchers("/","/board/**", "/user/**", "/api/**","/signup").permitAll()
//                    .anyRequest().authenticated()
//                    .and()
//                .formLogin()
//                    .usernameParameter("userid")
//                    .passwordParameter("userpassword")
//                    .loginPage("/login")
//                    .permitAll()
//                    .defaultSuccessUrl("/")
//                    .and()
//                .logout()
//                    .permitAll()
////                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
////                    .logoutSuccessUrl("redirect:/board/list")
////                    .invalidateHttpSession(true);
    }

    @Autowired

    public void configureGlobal(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .passwordEncoder(passwordEncoder());
//                .usersByUsernameQuery("select userid, userpassword, enabled "
//                        + "from user "
//                        + "where userid = ?")
//                .authoritiesByUsernameQuery("select u.username, r.name "
//                        + "from user_role ur inner join user u on ur.user_id = u.id "
//                        + "inner join role r on ur.role_id = r.id "
//                        + "where u.userid = ?");
    }

//비밀번호 암호화
    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //토큰
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


}