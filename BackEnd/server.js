require('dotenv').config()
const app = require('./src/app')

const PORT = process.env.PORT || 3000  // Use dynamic port on Render

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
