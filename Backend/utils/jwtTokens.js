export const generateToken = (user, message, statusCode, res) => {
  const token = user.getJwtToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,            // REQUIRED (Render = HTTPS)
      sameSite: "none",        // REQUIRED (cross-origin)
      expires: new Date(
        Date.now() +
          process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      message,
      user, // ❌ do NOT rely on token in frontend
    });
};

