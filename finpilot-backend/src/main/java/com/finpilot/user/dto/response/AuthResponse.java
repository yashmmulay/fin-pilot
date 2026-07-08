package com.finpilot.user.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String token;

    private String tokenType;

    private Long userId;

    private String fullName;

    private String email;

    private String role;
}
