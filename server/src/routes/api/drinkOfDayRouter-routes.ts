import express, { Request, Response } from 'express';

const router = express.Router()

router.get('/', async(_req: Request, res: Response) => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    // const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007');
    const data = await response.json();

    if (data) {
        res.status(200).json(data);
        return;
    }

    res.status(404).json({message: 'We could not connect with the api'});
});

export {router as drinkOfDayRouter}
