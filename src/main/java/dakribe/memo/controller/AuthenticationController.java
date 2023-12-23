package dakribe.memo.controller;

import dakribe.memo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin
public class AuthenticationController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthenticationResponse> signup(
            @RequestBody SignUpRequest request
    ) {
        AuthenticationResponse response = authService.signUp(request);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        return ResponseEntity.ok(authService.signUp(request));
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthenticationResponse> signup(
            @RequestBody SignInRequest request
    ) {
        return ResponseEntity.ok(authService.signIn(request));
    }
}
