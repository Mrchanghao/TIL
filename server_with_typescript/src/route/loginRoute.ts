import { Router, Request, Response, NextFunction } from 'express';


interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  }
}

function requireAuth (req: Request, res: Response, next: NextFunction ): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.redirect('/')
  
} 

const router = Router();

router.get('/login', ( _, res: Response ) => {   // interface Response
  // res.send('hi login route');
  res.send(`
    <form method="POST">
      <div>
        <label>EMAIL</label>
        <input name="email" />
      </div>
      <div>
      <label>password</label>
      <input name="password" type="password" />
    </div>
    <button>submit</button>
    </form>
  `)
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;


  if (email && password && email === 'lee@gmail.com' && password === '123') {
    // redirect to root route
    req.session = { loggedIn: true };
    res.redirect('/');
    //상태 저장
    
  } else {
    res.send('invalid email or password');
  }
  

})

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div><h1>Loged In</h1></div>
        <a href="/logout">Logout</a>
      </div>
    `)
  } else {
    res.send(`
      <div>
        <div><h1>Not login</h1></div>
        <a href="/login">Login</a>
      </div>
    `)
  }
})

router.get('/logout', (req: Request, res: Response) => {
  req.session = null;
  res.redirect('/');
})  

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`
    <div>welcome to Protected Route</div>
  `)
})


export {
  router
}
