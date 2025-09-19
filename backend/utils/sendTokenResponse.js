const sendTokenResponse = (user, statusCode, res, message = null) => {
    const token = user.getSignedJwtToken();

    // Cookie options
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // ✅ secure, frontend can't access this
        sameSite: "lax",
    };

    if (process.env.NODE_ENV === "production") {
        options.secure = true; // cookie only sent via HTTPS
    }

    // Send cookie + response JSON
    res
        .status(statusCode)
        .cookie("cognitoIdentity", token, options)
        .json({
            success: true,
            message,
            token, // frontend will use this
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                status: user.status,
                organization: user.organization,
                permissions: user.permissions,
                preferences: user.preferences,
            },
        });
};

module.exports = sendTokenResponse;