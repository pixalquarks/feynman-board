import express, {Request, Response} from 'express';
import db, {User, ITopic, IBlock} from '../db';

const router = express.Router();

const calculateUnderstanding = (blocks: IBlock[]): number => {
    let tU = 0;
    let count = 0;
    for (let b of blocks) {
        if (b.text.trim() !== "") {
            tU += b.understanding;
            count++;
        }
        
    }
    if (count === 0) {
        return 100;
    }
    return (tU / (count*4)) * 100;
}


router.get('/:username/topic', async (req: Request, res: Response): Promise<Response> => {
    console.log(req.body);
    console.log(req.params);
    try {
    const user = await User.findOne({name: req.params.username});
    if (user === null) {
        return res.status(404).json({"message" : "User not found"});
    }
    const topics = user.topics.map((topic: ITopic) => {
        return {
            "_id": topic._id,
            "name": topic.name,
            "understanding": calculateUnderstanding(topic.blocks)
        }
    })
    const dUser = {"name": user.name, "topics": topics}
    return res.status(200).json({"user": dUser});
} catch (e: any) {
    return res.status(500).json({"error": e.message});
}
});

router.get('/:username/topic/:id', async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await User.findOne({"name": req.params.username})
        if (!user) {
          return res.status(404).json({"message": "User not found"});
        } else {
            const topic = user.topics.filter((topic: ITopic) => topic._id.toString() === req.params.id)
            if (topic.length > 0) {
                return res.status(200).json({"topic": topic[0]})
            } else {
                return res.status(404).json({"message": "topic not found"});
            }
        }
    } catch (e: any) {
        return res.status(500).json({"error": e.message});
    }
});



router.post("/:username/topic", async (req: Request, res: Response): Promise<Response> => {
    console.log(req.body);
    console.log(req.params);
    try {
    const user = await User.findOne({name: req.params.username});
    if (user === null) {
        console.log("User undefined");
        const nUser = await User.create({name: req.params.username, topics: req.body});
        return res.status(200).json({"user": nUser});
    } else {
        console.log("user defined ", user);
        await User.updateOne({name: req.params.username}, { $push: { topics: req.body}});
        return res.status(200).json({"message": "Topic added"});
    }
} catch (e: any) {
    return res.status(500).json({"error": e.message});
}
});




router.put("/:username/topic/:id", async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await User.updateOne({"topics._id" : req.params.id}, {
            $set: {
                "topics.$": req.body,
            }
        })
        console.log(result);
        const nUser = await User.findOne({"name": req.params.username});
        return res.status(200).json({"user": nUser});
    } catch (e: any) {
        return res.status(500).json({"error": e.message});
    }
});



router.delete("/:username/topic/:id", async (req: Request, res: Response): Promise<Response> => {

    try {
        await User.updateOne({"name": req.params.username}, {
        $pull: { "topics": {_id: req.params.id} }
        });
        const user = await User.findOne({"name": req.params.username});
        return res.status(201).json({"user": user})
    } catch (e: any) {
        return res.status(500).json({"error" : e.message});
    }

});

export default router;