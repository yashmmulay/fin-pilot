package com.finpilot.watchlist.service;

import com.finpilot.user.entity.User;
import com.finpilot.watchlist.dto.AddWatchlistRequest;
import com.finpilot.watchlist.dto.WatchlistResponse;

import java.util.List;
import java.util.UUID;

public interface WatchlistService {

    WatchlistResponse addToWatchlist(User user, AddWatchlistRequest request);

    List<WatchlistResponse> getUserWatchlist(User user);

    void removeFromWatchlist(User user, UUID watchlistId);
}
