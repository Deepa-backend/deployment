/*import express  from 'express'

const app = express();

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{

    res.render('index.ejs')
})

app.post('/form-submit',(req,res)=>{
    res.json({
        message : 'your form has been submitted successfully',
        success:true
    })
})

const port = 3000;

app.listen(port,()=>console.log(`server is running on port ${port}`))
*/

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Recreate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index'); // Looks for views/index.ejs
});

app.post('/form-submit', (req, res) => {
  res.json({
    message: 'Your form has been submitted successfully',
    success: true,
    data: req.body,
  });
});

// Dynamic port for production hosting (e.g., Railway)
const port = process.env.PORT || 3000;

/*app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/


export default app;