package com.example.equipecao.ecommerce_api.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

import javax.sql.DataSource;

@Configuration
@EnableJdbcHttpSession(maxInactiveIntervalInSeconds = 1800) // Sessão expira em 30 minutos
public class HttpSessionConfig {

    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        serializer.setCookieName("JSESSIONID"); // Nome do cookie
        serializer.setCookiePath("/"); // Caminho do cookie
        serializer.setDomainNamePattern("^.+?\\.(\\w+\\.[a-z]+)$"); // Domínio do cookie
        return serializer;
    }

    @Bean
    public DataSource dataSource() {
        // Configuração do DataSource (exemplo usando HikariCP)
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/ecommerce");
        dataSource.setUsername("root");
        dataSource.setPassword("");
        return dataSource;
    }
}