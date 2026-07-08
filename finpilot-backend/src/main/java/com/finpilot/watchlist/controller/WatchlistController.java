package com.finpilot.watchlist.controller;

import com.finpilot.auth.service.CustomUserDetails;
import com.finpilot.watchlist.dto.AddWatchlistRequest;
import com.finpilot.watchlist.dto.WatchlistResponse;
import com.finpilot.watchlist.service.WatchlistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/watchlist")
@RequiredArgsConstructor
public class WatchlistController {

    private final WatchlistService watchlistService;

    @PostMapping
    public ResponseEntity<WatchlistResponse> addToWatchlist(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody AddWatchlistRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(watchlistService.addToWatchlist(userDetails.getUser(), request));
    }

    @GetMapping
    public ResponseEntity<List<WatchlistResponse>> getUserWatchlist(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return ResponseEntity.ok(
                watchlistService.getUserWatchlist(userDetails.getUser())
        );
    }

    @DeleteMapping("/{watchlistId}")
    public ResponseEntity<Void> removeFromWatchlist(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID watchlistId) {

        watchlistService.removeFromWatchlist(
                userDetails.getUser(),
                watchlistId
        );

        return ResponseEntity.noContent().build();
    }
}
