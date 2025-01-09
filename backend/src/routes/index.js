import { Router } from "express"

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send({
      success: 1,
      message:
        'Hello from Abdullahi Bank. Check the API specification for further guidance and next steps.',
    });
  });

  export default router