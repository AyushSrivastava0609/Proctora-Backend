import jwt from 'jsonwebtoken'; 

const SECRET_KEY = "kjbsefh8294r24hr29r8y92ry"; 

const generateToken = ({ email }) => {
    return jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
};

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        
        if (!token) {
            return res.status(404).send("Token not found");
        }

        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach decoded user info to the request object
        next(); // Call the next middleware or route handler
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
};

export { generateToken, verifyToken };