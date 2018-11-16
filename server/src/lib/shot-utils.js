/** Shot specific utility methods shared across pages */

class ShotUtils {
  recordError(err) {
    console.warn("Error in shot utils:", err);
    window.Raven.captureException(err);
    throw err;
  }

  /* Change shot favorite status by updating shot expire time */
  async changeShotExpiration(shot, backend, csrfToken, defaultExpirationMs, newExpiration) {
    const url = backend + "/api/set-expiration";
    newExpiration = newExpiration || (shot.isFavorite ? defaultExpirationMs : 0);

    const data = {
      "id": shot.id,
      "expiration": newExpiration,
      "_csrf": csrfToken,
    };
    try {
      const resp = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error(`Error calling /api/set-expiration: ${resp.status} ${resp.statusText}`);
      }
      shot.expireTime = newExpiration ? Date.now() + newExpiration : null;
      shot.isFavorite = !newExpiration;
    } catch (err) {
      this.recordError(err);
    }
  }
}

if (typeof exports !== "undefined") {
  exports.ShotUtils = ShotUtils;
}
